import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const authFromLS = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null

const initialState = {
  auth: authFromLS,
  isError: false,
  isSucess: false,
  isLoading: false,
  message: ''
}

export const register = createAsyncThunk('auth/register', async(user, thunkApi) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (err) {
    const message = (
      err.response && 
      err.response.data && 
      err.response.data.message
    ) || err.message || err.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async() => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState.auth,
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.auth = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.auth = null
      })
    
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.auth = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.auth = null
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.auth = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
