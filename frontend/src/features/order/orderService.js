import axios from 'axios'
import { API_URL } from "../../config"

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const addOrderItem = async (orderItems, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.post(`${API_URL}/v1/api/order`, orderItems, config)

  if(!res.data) throw new Error('Could not add order items')

  return res.data
} 

const getOrderById = async (id, token) => {
  config.headers = { Authorization: `Bearer ${token}`}

  const res = await axios.get(`${API_URL}/v1/api/order/${id}`, config)

  if(!res.data) throw new Error('Could not get order')

  return res.data
} 

const getMyOrders = async (token) => {
  config.headers = { Authorization: `Bearer ${token}`}

  const res = await axios.get(`${API_URL}/v1/api/order/myorders`, config)

  if(!res.data) throw new Error('Could not get orders')

  return res.data
} 

const getOrders = async (token) => {
  config.headers = { Authorization: `Bearer ${token}`}

  const res = await axios.get(`${API_URL}/v1/api/order`, config)

  if(!res.data) throw new Error('Could not get orders')

  return res.data
} 

const payOrder = async ({ id, paymentResult }, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.put(`${API_URL}/v1/api/order/${id}/pay`, paymentResult, config)

  if(!res.data) throw new Error('Could not pay order')

  return res.data
} 

const orderDelivered = async (id, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.put(`${API_URL}/v1/api/order/${id}/deliver`, {}, config)

  if(!res.data) throw new Error('Could not deliver order')

  return res.data
} 

const orderService = {
  addOrderItem,
  getOrderById,
  payOrder,
  getMyOrders,
  getOrders,
  orderDelivered
}

export default orderService
