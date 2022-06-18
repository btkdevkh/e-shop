import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()
  const redirect = window.location.search.split('=')[1]

  const dispatch = useDispatch()
  const { isLoading, isError, auth, message } = useSelector(state => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    if(auth) {
      redirect === 'shipping' ?
      navigate('/shipping') :
      navigate('/')
    }
  }, [auth, redirect, navigate])

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {isError && <Message variant='danger'>{message}</Message>}
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
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

        <Button className='mt-3' type='submit' variant='primary'>
          Sign In
        </Button>
      </form>

      <Row className='py-3'>
        <Col>
          New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Sign Up</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Login