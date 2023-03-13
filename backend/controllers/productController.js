const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const User = require('../models/userModel')

// @desc Get Products
// @router GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({prdcts: products})
})

// @desc Set Product
// @router POST /api/products
// @access  Private
const setProduct = asyncHandler(async (req, res) => {
  const {user, name, image, video, price, catagory, properties,
  availability, reward_points, total_sales, total_revenue} = req.body
    if(!name || !price)
    {
        res.status(400)
        throw new Error('Fill up the required fields')
    }

    const product = await Product.create({
      user,
      name,
      image,
      video,
      price,
      catagory,
      properties: [{name: 'size',value: 'xxxl'}],
      availability,
      reward_points,
      total_sales,
      total_revenue,
    })
    res.status(200).json(product)
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

module.exports = {
    getProducts,
    setProduct,
    updateProduct,
    deleteProduct,
}