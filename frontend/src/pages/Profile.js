import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../features/user/userSlice'
import { getMyOrders } from '../features/order/orderSlice'

export default function Profile() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')

  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const { isLoading, isError, isUpdateProfileSuccess, user, message } = useSelector(state => state.user)
  const { orders } = useSelector(state => state.order)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMsg('Password must be the same')
    } else {
      dispatch(updateUserProfile({ name, email, password }))
    }
  }

  useEffect(() => {
    if(!auth) {
      navigate('/login')
    } else {
      if(!user) {
        dispatch(getUserDetails())
        dispatch(getMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [auth, user, dispatch, navigate])

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        {isError && <Message variant='danger'>{message}</Message>}
        {msg && <Message variant='danger'>{msg}</Message>}
        {isUpdateProfileSuccess && <Message variant='success'>Profile Updated</Message>}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type='email' 
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type='password' 
              placeholder='Enter confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'>
            Update
          </Button>
        </form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {orders && (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{color: 'red'}}></i>}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}
