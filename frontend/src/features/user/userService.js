import axios from 'axios'
import { API_URL } from '../../config'

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const getUsers = async (token) => {  
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.get(API_URL + '/v1/api/user/all', config)
  return res.data
}

const getUserDetails = async (token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.get(API_URL + '/v1/api/user/profile', config)
  return res.data
}

const updateUserProfile = async (userData, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.put(API_URL + '/v1/api/user/profile', userData, config)

  if(res.data) {
    localStorage.setItem('auth', JSON.stringify(res.data))
  }

  return res.data
}

const deleteUser = async (id, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.delete(API_URL + '/v1/api/user/' + id, config)
  return res.data
}

const getUserById = async (id, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.get(API_URL + '/v1/api/user/' + id, config)
  return res.data
}

const updateUser = async (userData, token) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${token}`}

  const res = await axios.put(API_URL + `/v1/api/user/${userData.id}`, userData, config)
  
  return res.data
}

const authService = {
  getUserDetails,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
}

export default authService
