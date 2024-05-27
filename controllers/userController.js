const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const generateToken = require('../utils/generateToken')
const bcrypt = require('bcryptjs')

console.log('reacher here')
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { isSeller, name, email, password } = req.body
    console.log('evry = ', { isSeller, name, email, password })

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      isSeller: isSeller
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ success: false })
  }
})

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      isSeller: user.isSeller,
      sellerName: user.name,
      sellerEmail: user.email,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
}
