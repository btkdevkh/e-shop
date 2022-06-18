import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  topRatedProducts: [],
  product: null,
  isError: false,
  isSucess: false,
  isDeleteSuccess: false,
  isCreateSuccess: false,
  isUpdateSuccess: false,
  isCreateReviewSuccess: false,
  isLoading: false,
  message: ''
}

export const getProducts = createAsyncThunk('product/getProducts', async (datas, thunkAPI) => {
  try {
    return await productService.getProducts(datas)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getTopRatedProducts = createAsyncThunk('product/getToRaedProducts', async (_, thunkAPI) => {
  try {
    return await productService.getTopRatedProducts()
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const getProduct = createAsyncThunk('product/getProduct', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await productService.getProduct(id, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await productService.deleteProduct(id, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createProduct = createAsyncThunk('product/createProduct', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await productService.createProduct(token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (datas, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await productService.updateProduct(datas, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const createReview = createAsyncThunk('product/createReview', async (datas, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.auth.token
    return await productService.createReview(datas, token)
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSucess = true
        state.products = actions.payload.products
        state.pages = actions.payload.pages
        state.page = actions.payload.page
      })
      .addCase(getProducts.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.products = []
      })

      .addCase(getTopRatedProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTopRatedProducts.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSucess = true
        state.topRatedProducts = actions.payload
      })
      .addCase(getTopRatedProducts.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.topRatedProducts = []
      })

      .addCase(getProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProduct.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isSucess = true
        state.product = actions.payload
      })
      .addCase(getProduct.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.product = null
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isDeleteSuccess = true
      })
      .addCase(deleteProduct.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.products = []
      })

      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isCreateSuccess = true
        state.product = actions.payload
      })
      .addCase(createProduct.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.product = null
      })

      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isUpdateSuccess = true
      })
      .addCase(updateProduct.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.product = null
      })

      .addCase(createReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createReview.fulfilled, (state, actions) => {
        state.isLoading = false
        state.isCreateReviewSuccess = true
      })
      .addCase(createReview.rejected, (state, actions) => {
        state.isLoading = false
        state.isError = true
        state.message = actions.payload
        state.product = null
      })
  }
})

export const { reset } = productSlice.actions
export default productSlice.reducer
