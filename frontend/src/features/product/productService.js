import axios from 'axios'
import { API_URL } from "../../config"

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const getProducts = async ({ keyword = '', pageNumber = '' } ) => {
  const res = await axios.get(API_URL + `/v1/api/product?keyword=${keyword}&pageNumber=${pageNumber}`)

  if(!res.data) throw new Error('Could not fetch products')
  
  return res.data
} 

const getTopRatedProducts = async () => {
  const res = await axios.get(API_URL + '/v1/api/product/top')

  if(!res.data) throw new Error('Could not get top products')
  
  return res.data
} 

const getProduct = async (id, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.get(API_URL + '/v1/api/product/' + id, config)

  if(!res.data) throw new Error('Could not get product')
  
  return res.data
} 

const deleteProduct = async (id, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.delete(API_URL + '/v1/api/product/' + id, config)

  if(!res.data) throw new Error('Could not delete product')
  
  return res.data
} 

const createProduct = async (token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}
  
  const res = await axios.post(API_URL + '/v1/api/product', {}, config)

  if(!res.data) throw new Error('Could not create product')
  
  return res.data
} 

const updateProduct = async (productData, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}
  
  const res = await axios.put(API_URL + '/v1/api/product/' + productData._id, productData, config)

  if(!res.data) throw new Error('Could not create product')
  
  return res.data
} 

const createReview = async (datas, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  console.log(datas.id);
  
  const res = await axios.post(API_URL + `/v1/api/product/review/${datas.id}`, datas.reviewData, config)

  if(!res.data) throw new Error('Could not create review')
  
  return res.data
} 

const productService = {
  getProducts,
  deleteProduct,
  createProduct,
  getProduct,
  updateProduct,
  createReview,
  getTopRatedProducts
}

export default productService
