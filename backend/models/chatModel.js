const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    sender: mongoose.Schema.Types.ObjectId,
    receiver: mongoose.Schema.Types.ObjectId,
    message: String,
},
{
    timestamps: true,
})

module.exports = mongoose.model('Chats', chatSchema)