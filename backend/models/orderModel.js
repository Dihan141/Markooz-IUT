const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    product: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    total_price: Number,
    payment_type: {
        type: String,
        required: [true, 'Please add a payment method']
    },
    status: String,
},
{
    timestamps: true,
})

module.exports = mongoose.model('Order', orderSchema)