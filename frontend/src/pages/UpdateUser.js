import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserById, updateUser, reset } from '../features/user/userSlice'

export default function UpdateUser() {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)
  const { isLoading, isError, isUpdateUserSuccess, message, getUserToUpdate } = useSelector(state => state.user)

  const [admin, setIsAdmin] = useState(getUserToUpdate && getUserToUpdate.isAdmin === 'true' ? true : false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = { id, isAdmin: admin}
    dispatch(updateUser(user))
  }

  useEffect(() => {
    if(!auth && auth.isAdmin === 'false') {
      navigate('/login')
    } else {
      dispatch(getUserById(id))
    }

    if(isUpdateUserSuccess) {      
      setTimeout(() => {
        navigate('/admin/userlist')
        dispatch(reset())
        window.location.reload()
      }, 2000)
    }
  }, [auth, dispatch, navigate, isUpdateUserSuccess])

  return (
    <Row>
      <Col md={12}>
        <h2>User {getUserToUpdate && getUserToUpdate.name}</h2>
        {isError && <Message variant='danger'>{message}</Message>}
        {isUpdateUserSuccess && <Message variant='success'>Profile Updated</Message>}
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit}>
          { getUserToUpdate && (
            <Form.Group controlId='isadmin'>
              <Form.Check 
                label='Is Admin'
                type='checkbox' 
                checked={admin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              >
              </Form.Check>
            </Form.Group>
          )}
          
          <Button className='my-3' type='submit' variant='primary'>
            Update
          </Button>
        </form>
      </Col>
    </Row>
  )
}
