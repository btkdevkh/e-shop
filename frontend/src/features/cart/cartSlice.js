import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addToCart } from './cartService'

const cartsFromLS = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const shippingAddressFromLS = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const paymentMethodFromLS = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''

const initialState = { 
  cartItems: cartsFromLS, 
  shippingAddress: shippingAddressFromLS,
  paymentMethod: paymentMethodFromLS,
}

export const addCartItem = createAsyncThunk('cart/addCartItem', async (cart, thunkAPI) => {
  try {
    return await addToCart(cart, thunkAPI)
  } catch (err) {
    const message = (
      err.response && 
      err.response.data && 
      err.response.data.message
    ) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => initialState.cartItems,
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(c => c._id !== action.payload._id)
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItem.fulfilled, (state, action) => {
        const item = action.payload
        
        const existsItem = state.cartItems.find(x => x._id === item._id)

        if(existsItem) {
          state.cartItems = state.cartItems.map(x => x._id === existsItem._id ? item : x)
        } else {
          state.cartItems.push(item)
        }
      })
  }
})

export const { removeCartItem, saveShippingAddress, reset, savePaymentMethod } = cartSlice.actions
export default cartSlice.reducer
