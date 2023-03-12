const asyncHandler = require('express-async-handler')

const User = require('../models/userModel');

// Create a new user
// @desc Set User
// @router POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Get a list of all users
// @desc Get Users
// @router GET /api/users
// @access  Private
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
      } catch (error) {
        res.status(500).json({ message: error.message })
      }
})

// Get a single user by ID
// Get a user by their id
// @desc Get User
// @router GET /api/users/id
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// Update a user by ID
// Update a user by their id
// @desc Update User
// @router PUT /api/users/id
// @access  Private
const updateUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// Delete a user by ID
// Delte a user by their id
// @desc Uelete User
// @router DELETE /api/users/id
// @access  Private
const deleteUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
}