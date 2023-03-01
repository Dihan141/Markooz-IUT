const express = require('express')
const router = express.Router()
const {getProducts, setProducts} = require('../controllers/productController')

router.get('/', getProducts)

router.post('/', setProducts)

module.exports = router