import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Jim',
    email: 'jim@live.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },
  {
    name: 'Bella',
    email: 'bella@live.com',
    password: bcrypt.hashSync('123456', 10),
  }
]

export default users
