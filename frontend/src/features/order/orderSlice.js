import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
  order: null,
  orders: [],
  orderDetails: null,
  orderPay: null,
  isError: false,
  isSucess: false,
  isDeliveredSuccess: false,
  isLoading: false,
  message: ''
}

export const addOrderItem = createAsyncThunk('order/addOrderItems', async(orderItems, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.addOrderItem(orderItems, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const getMyOrders = createAsyncThunk('order/getMyOrders', async(_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.getMyOrders(token)
  } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const getOrders = createAsyncThunk('order/getOrders', async(_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.getOrders(token)
  } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const getOrderById = createAsyncThunk('order/getOrderById', async(id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.getOrderById(id, token)
  } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const payOrder = createAsyncThunk('order/payOrder', async(paymentResultAndId, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.payOrder(paymentResultAndId, token)
  } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const orderDelivered = createAsyncThunk('order/orderDelivered', async(id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await orderService.orderDelivered(id, token)
  } catch (error) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderItem.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addOrderItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.order = action.payload
      })
      .addCase(addOrderItem.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.orderDetails = action.payload
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })

      .addCase(payOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.orderPay = action.payload
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })

      .addCase(orderDelivered.pending, (state) => {
        state.isLoading = true
      })
      .addCase(orderDelivered.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeliveredSuccess = true
      })
      .addCase(orderDelivered.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })

      .addCase(getMyOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.orders = action.payload
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
      })
  }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer
