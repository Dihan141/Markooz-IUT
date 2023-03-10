const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    product: mongoose.Schema.Types.ObjectId,
    rating: Number,
    Comment: String,
    reported: {
        type: Boolean,
        default: false,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Reviews', reviewSchema)