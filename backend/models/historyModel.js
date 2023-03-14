const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    merchant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    total_price: Number
},
{
    timestamps: true,
})

module.exports = mongoose.model('History', historySchema)

//i donot think we need a seperate history model... we can make do with just he order model.. since it has status, user id and timestamps
