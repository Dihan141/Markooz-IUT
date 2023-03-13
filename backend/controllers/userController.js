const asyncHandler = require('express-async-handler')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Create a new user
// @desc Set User
// @router POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {firstName, lastName, email, password, address, phoneNumber, isMerchant} = req.body
  if(!firstName || !lastName || !email || !password || !address || !phoneNumber){
    res.status(400)
    throw new Error('Please add all fields')
  }
  //Check if user exists
  const userExists = await User.findOne({email,isMerchant})
  if(userExists){
    res.status(400)
    throw new Error('Account already exists')
  }
  //validate password
  if(password.length<8)
  {
    res.status(400)
    throw new Error('Password cannot be less than 8 characters')
  }
  if(password.toUpperCase()==password || password.toLowerCase()==password){
    res.status(400)
    throw new Error('Password must consist of uppercase and lowercase letters')
  }
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
    const newUser = await User.create({
      firstName, 
      lastName, 
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      isMerchant
      });
    if(newUser) {
      res.status(201).json({
        _id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        isMerchant: newUser.isMerchant,
        token: generateToken(newUser._id),
      })
    }else{
      res.status(400)
      throw new Error('Invalid user data')
    }
})

//Login a user
//@desc Authenticate a user
//@router POST /api/users/login
//@access Public
const loginUser = asyncHandler(async(req,res)=>{
  const {email, password, isMerchant} = req.body
  //check for user email
  const user = await User.findOne({email,isMerchant})
  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isMerchant: user.isMerchant,
      token: generateToken(user._id),
  })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
})

// // Get a list of all users
// // @desc Get Users
// // @router GET /api/users
// // @access  Private
// const getAllUsers = asyncHandler(async (req, res) => {
//     try {
//         const users = await User.find()
//         res.status(200).json(users)
//       } catch (error) {
//         res.status(500).json({ message: error.message })
//       }
// })

// // Get a single user by ID
// // Get a user by their id
// // @desc Get User
// // @router GET /api/users/id
// // @access  Private
// const getUserById = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

// // Update a user by ID
// // Update a user by their id
// // @desc Update User
// // @router PUT /api/users/id
// // @access  Private
// const updateUserById = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true
//     });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// })

// // Delete a user by ID
// // Delte a user by their id
// // @desc Uelete User
// // @router DELETE /api/users/id
// // @access  Private
// const deleteUserById = asyncHandler(async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

//@desc   Get user data
//@route  GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req,res)=> {
  const { _id, name,email,isMerchant} = await User.findById(req.user.id)

  res.status(200).json({
    id: _id,
    name,
    email,
    isMerchant,
  })
})


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn: '30d',
  })
}

module.exports = {
    registerUser,
    // getAllUsers,
    // getUserById,
    // updateUserById,
    // deleteUserById,
    loginUser,
    getMe
}