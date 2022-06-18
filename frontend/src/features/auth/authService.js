import axios from 'axios'
import { API_URL } from '../../config'

const config = {
  headers: {
    'Content-Type': 'application/json',
  }
}

const register = async (userData) => {
  const res = await axios.post(API_URL + '/v1/api/user/register', userData, config)

  if(res.data) {
    localStorage.setItem('auth', JSON.stringify(res.data))
  }

  return res.data
}

const login = async (userData) => {
  const res = await axios.post(API_URL + '/v1/api/user/login', userData, config)

  if(res.data) {
    localStorage.setItem('auth', JSON.stringify(res.data))
  }

  return res.data
}

const logout = async () => {
  localStorage.removeItem('auth')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
