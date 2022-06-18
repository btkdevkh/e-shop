import axios from 'axios'
import { API_URL } from "../../config"

export const addToCart = async (cart, thunkAPI) => {
  const res = await axios.get(`${API_URL}/v1/api/product/${cart.id}`)

  if(!res.data) throw new Error('Could not fetch product')

  const cartItems = thunkAPI.getState().carts.cartItems
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems))

  return { ...res.data, qty: cart.qty }
} 
