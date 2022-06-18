import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsync from 'express-async-handler'

export const protect = expressAsync(async (req, res, next) => {
  console.log(req.user);

  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (err) {
      console.error(err);
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

export const admin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as user')
  }
}
