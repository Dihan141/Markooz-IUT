const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    validate: {
      validator: validator.isEmail,
      message: 'The entered email is invalid'
    }
  },
  password: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter a Phone Number']
  },
  address: {
    type: String,
    required: [true, 'Please enter an address']
  },
  isMerchant: {
    type: Boolean,
    required: true,
    default: false

  }
},
{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);