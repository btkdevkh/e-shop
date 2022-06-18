import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
  name: { type: String, require: true },
  rating: { type: Number, require: true },
  comment: { type: String, require: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
}, { timestamps: true })

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  name: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true,
  },
  brand: {
    type: String,
    require: false
  },
  category: {
    type: String,
    require: true,
  },
  reviews: [reviewSchema],
  description: {
    type: String,
    require: false,
  },
  rating: {
    type: Number,
    require: false,
    default: 0
  },
  numReviews: {
    type: Number,
    require: false,
    default: 0
  },
  price: {
    type: String,
    require: true,
    default: 0
  },
  countInStock: {
    type: String,
    require: false,
    default: 0
  }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product
