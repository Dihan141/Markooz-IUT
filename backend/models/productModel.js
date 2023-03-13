const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
        
    },
    name:{
        type: String,
        required: [true, 'Please add a name']
    },
    image: [String],
    video: [String],
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    catagory: [String],
    properties: [
        {
            name: String,
            value: String
        }
    ],
    availability: String,
    reward_points: Number,
    total_sales: Number,
    total_revenue: Number,
},
{
    timestamps: true,
})

module.exports = mongoose.model('Product', productSchema)