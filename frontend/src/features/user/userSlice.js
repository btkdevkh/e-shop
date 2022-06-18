import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

const initialState = {
  users: [],
  user: null,
  getUserToUpdate: null,
  isError: false,
  isSucess: false,
  isLoading: false,
  isUpdateProfileSuccess: false,
  isDeleteUserSuccess: false,
  isUpdateUserSuccess: false,
  message: ''
}

export const getUsers = createAsyncThunk('user/getUsers', async(_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await userService.getUsers(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const getUserDetails = createAsyncThunk('user/getUserDetails', async(_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await userService.getUserDetails(token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async(userData, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token;
    return await userService.updateUserProfile(userData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async(id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await userService.deleteUser(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const getUserById = createAsyncThunk('user/getUserById', async(id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token
    return await userService.getUserById(id, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const updateUser = createAsyncThunk('user/updateUser', async(userData, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.auth.token;
    return await userService.updateUser(userData, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkApi.rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.users = action.payload
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
        state.users = []
      })

      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.user = action.payload
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
        state.user = null
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.isUpdateProfileSuccess = true
        state.user = action.payload
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
        state.user = null
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isDeleteUserSuccess = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isDeleteUserSuccess = false
        state.message = action.payload
        state.user = null
      })

      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSucess = true
        state.getUserToUpdate = action.payload
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSucess = false
        state.message = action.payload
        state.getUserToUpdate = null
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isError = false
        state.isUpdateUserSuccess = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isUpdateUserSuccess = false
        state.message = action.payload
      })
  }
})

export const { reset } = userSlice.actions
export default userSlice.reducer
