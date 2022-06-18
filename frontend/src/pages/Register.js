import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../features/auth/authSlice'
import FormContainer from '../components/FormContainer'

const Register = ({ location }) => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')

  const dispatch = useDispatch()
  const { isLoading, isError, auth, message } = useSelector(state => state.auth)

  const redirect = window.location.search ? window.location.search.split('=')[1] : '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      setMsg('Password must be the same')
    } else {
      dispatch(register({ name, email, password }))
    }
  }

  useEffect(() => {
    if(auth) {
      navigate(redirect)
    }
  }, [auth, redirect, navigate])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {isError && <Message variant='danger'>{message}</Message>}
      {msg && <Message variant='danger'>{msg}</Message>}
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

        <Button type='submit' variant='primary' className='my-3'>
          Sign Up
        </Button>
      </form>

      <Row className='py-3'>
        <Col>
          Already Customer ? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Sign In</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Register