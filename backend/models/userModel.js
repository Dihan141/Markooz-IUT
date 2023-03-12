const mongoose = require('mongoose');

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
    unique: [true,'An account already exists under the email you provided']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please enter a Phone Number']
  },
  address: {
    type: String,
    required: [true, 'Please enter an address']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;