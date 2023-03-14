const express = require('express')
const router = express.Router()
const {getProducts, setProduct, updateProduct, deleteProduct,searchProducts, productInfo, addToCart, confirmOrder} = require('../controllers/productController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getProducts).post(protect, setProduct)
router.route('/:id').put(protect, updateProduct).delete(protect, deleteProduct).get(productInfo)
router.route('/search/').get(searchProducts)
router.route('/:userId/cart/:productId').post(addToCart)
router.route('/:userId/placeorder/').post(confirmOrder)

module.exports = router