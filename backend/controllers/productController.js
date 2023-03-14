const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const Order = require('../models/orderModel')

// @desc Get Products
// @router GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

//@desc Search Products based on name or category... more fields can be added if needed
//@router GET /api/products/search/
//@access Public
const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.body.query;
    
    // Search for products by name or category
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        // { category: { $regex: searchQuery, $options: 'i' } }
        { catagory: { $elemMatch: { $regex: searchQuery, $options: 'i' } } }
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  // console.log(req.body.query)
  // res.status(200).json({message: req.body.query})
};

// @desc Set Product
// @router POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
    if(!req.body.name || !req.body.price)
    {
        res.status(400)
        throw new Error('Fill up the required fields')
    }
    if(req.user.isMerchant == true){
    const product = await Product.create({
        name: req.body.name,
        image: req.body.name + ' image',
        user: req.user.id,
        price: req.body.price,
        availability: req.body.availability,
    })
    res.status(200).json(product)}
    else {
      res.status(500).json({message: 'User is not a merchant. How did you get here?!?'})
    }
})

// @desc Update Product
// @router PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async(req,res) => {
        const product = await Product.findById(req.params.id) 
        if (!product) {
          res.status(404)
          throw new Error('Product not found');
        }
        
        const user = await User.findById(req.user.id)
        //Check for user
        if(!user) {
          res.status(404)
          throw new Error('User does not exist')
        }
        //Make sure the logged in user matches the product's merchant
        if(product.user.toString()!=user.id)
        {
          res.status(401)
          throw new Error('User not Authorized')
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true
        })
        res.status(200).json(updatedProduct);
})

// @desc Delete Product
// @router DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async(req,res) => {
        const product = await Product.findById(req.params.id)
        if (!product) {
          res.status(404)
          throw new Error('Product not found');
        }

        const user = await User.findById(req.user.id)
        //Check for user
        if(!user) {
          res.status(404)
          throw new Error('User does not exist')
        }
        //Make sure the logged in user matches the product's merchant
        if(product.user.toString()!=user.id)
        {
          res.status(401)
          throw new Error('User not Authorized')
        }


        await product.remove()
        res.status(200).json({ message: `Product deleted successfully` });
})

const productInfo = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)
  res.status(200).json(product)
})

const addToCart = asyncHandler(async(req, res)=>{
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if product exists and get its details
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Add product to user's cart
  user.cart.push({
    product: product._id,
    quantity,
    price: product.price * quantity
  });

  // Save changes to user document
  await user.save();

  res.status(200).json({ message: 'Product added to cart successfully',
                         Name: product.name,
                         Quantity: quantity,
                         Price: product.price * quantity });
})

const confirmOrder =  asyncHandler(async(req, res)=>{
      const user = await User.findById(req.params.userId)
      const Cart = user.cart

      // Create the order based on the cart items
      const items = Cart.map((item) => ({
        productId: item.product,
        payablePrice: item.price,
        purchasedQty: item.quantity,
      }));
      const totalAmount = Cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
      const order = await Order.create({
        user: user._id,
        address: user.address,
        items,
        totalAmount,
        paymentStatus: 'pending',
        paymentType: 'cod',
        orderStatus: [{ type: 'ordered', date: Date.now() }],
      });


          // Update the product quantity in the database
      for (const item of Cart) {
        const product = item.product;
        const newQuantity = product.quantity - item.quantity;
        await Product.findByIdAndUpdate(product._id, { quantity: newQuantity });
      }
  
      // Clear the user's cart
      user.Cart = [];
      await user.save();
  
      res.status(201).json({ message: 'Order created successfully', order });
})

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    productInfo,
    addToCart,
    confirmOrder,
}