import Product from '../models/productModel.js'
import expressAsync from 'express-async-handler'

const getProducts = expressAsync(async (req, res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword 
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i'
        }
      } 
    : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page -1))

  res.status(200).json({ products, page, pages: Math.ceil(count /  pageSize) })
})

const getProduct = expressAsync(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)

  if(product) {
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const deleteProduct = expressAsync(async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)

  if(product) {
    await product.remove()
    res.status(200).json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createProduct = expressAsync(async (req, res) => {    
  const product = new Product({
    name: 'Sample Product',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })

  const createdProduct = await product.save()
  res.status(200).json(createdProduct)
})

const updateProduct = expressAsync(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body
  const productFound = await Product.findById(req.params.id)

  if(productFound) {
    productFound.name = name
    productFound.price = price
    productFound.description = description
    productFound.image = image
    productFound.brand = brand
    productFound.category = category
    productFound.countInStock = countInStock

    const updateProduct = await productFound.save()
    res.status(200).json(updateProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const createReview = expressAsync(async (req, res) => {
  const { rating, comment } = req.body
  const productFound = await Product.findById(req.params.id)

  if(productFound) {
    const alreadyReviewed = productFound.reviews.find(r => r.user.toString() === req.user._id.toString())

    if(alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    productFound.reviews.push(review)
    productFound.numReviews = productFound.reviews.length
    productFound.rating = productFound.reviews.reduce((acc, item) => item.rating + acc, 0) / productFound.reviews.length

    await productFound.save()
    res.status(200).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const geTopRatedProducts = expressAsync(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.status(200).json(products)
})

export {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  geTopRatedProducts
}
