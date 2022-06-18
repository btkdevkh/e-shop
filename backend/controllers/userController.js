import User from '../models/userModel.js'
import expressAsync from 'express-async-handler'
import jwt from 'jsonwebtoken'

const registerUser = expressAsync(async (req, res) => {
  const { name, email, password, isAdmin } = req.body

  if(!name) {
    res.status(400)
    throw new Error('Please fill your informations')
  }

  const userExists = await User.findOne({ email })

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin
  })

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

const authUser = expressAsync(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if(user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid Email or Password')
  }
});

const getUserProfile = expressAsync(async (req, res) => {  
  if(req.user) {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

const getUsers = expressAsync(async (req, res) => {  
  const users = await User.find()
  res.json(users)
});

const updateUserProfile = expressAsync(async (req, res) => {
  const user = await User.findById(req.user._id)

  if(user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if(req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

const deleteUser = expressAsync(async (req, res) => {  
  const user = await User.findById(req.params.id)
  if(user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

const getUserById = expressAsync(async (req, res) => {  
  const user = await User.findById(req.params.id)
    .select('-password')

  if(user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

const updateUser = expressAsync(async (req, res) => {
  const user = await User.findById(req.params.id)

  if(user) {
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id)
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// Generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
};

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
}
