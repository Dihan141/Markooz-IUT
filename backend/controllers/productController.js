const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find()
    res.status(200).json(products)
})

const setProducts = asyncHandler(async (req, res) => {
    if(!req.body.text)
    {
        res.status(400)
        throw new Error('Fill up the fields')
    }

    const product = await Product.create({
        name: req.body.text,
        image: req.body.text + ' image'
    })
    res.status(200).json(product)
})

module.exports = {
    getProducts,
    setProducts
}