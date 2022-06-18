import express from 'express'
import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/all', protect, admin, getUsers)
router.post('/login', authUser)
router.post('/register', registerUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)

export default router
