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
  },
  cart:[
    {
      product: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    }
  ],
  // avatar: {
  //   type: String,
  //   required: true,
  // },
  resetPasswordToken: String,
  resetPasswordTime: Date,
},
{
  timestamps: true
});


// // Hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // jwt token
// userSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// // comapre password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);