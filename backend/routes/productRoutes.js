import express from 'express'
import { getProducts, getProduct, deleteProduct, updateProduct, createProduct, createReview, geTopRatedProducts } from '../controllers/productController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)
router.get('/top', geTopRatedProducts)
router.route('/:id')
  .get(getProduct)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
router.route('/review/:id')
  .post(protect, createReview)
  
export default router
