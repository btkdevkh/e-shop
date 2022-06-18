import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProduct, updateProduct, reset } from '../features/product/productSlice'
import FormContainer from '../components/FormContainer'
import axios from 'axios'
import { API_URL } from '../config'

const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const { isUpdateSuccess, isLoading, isError, product, message } = useSelector(state => state.products)

  const handleSubmit = (e) => {
    e.preventDefault()
    const product = {
      _id: id,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }

    dispatch(updateProduct(product))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post(`${API_URL}/v1/api/upload`, formData, config)

      setImage(data)
      setUploading(false)
    } catch (err) {
      console.log(err);
      setUploading(false)
    }
  }

  useEffect(() => {
    if(!product || product._id !== id) {
      dispatch(getProduct(id))
    } else {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }

    if(isUpdateSuccess) {
      dispatch(reset())
      navigate('/admin/productlist')
    }
  }, [navigate, product, isUpdateSuccess, id])

  return (
    <FormContainer>
      <h1>Update Product</h1>
      {isError && <Message variant='danger'>{message}</Message>}
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control 
            type='number' 
            placeholder='Enter price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='image'>
          <Form.Label>Image</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter image url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          >
          </Form.Control>
          <Form.Control
            type='file'
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>

        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter brand'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control 
            type='text' 
            placeholder='Enter count in stock'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea" 
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='my-3'>
          Update
        </Button>
      </form>
    </FormContainer>
  )
}

export default UpdateProduct
