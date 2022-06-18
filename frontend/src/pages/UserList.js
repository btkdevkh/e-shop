import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUsers, deleteUser, reset } from '../features/user/userSlice'

export default function UserList() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { isLoading, isError, isDeleteUserSuccess, users, message } = useSelector(state => state.user)
  const { auth } = useSelector(state => state.auth)

  const handleDeleteUser = (id) => {
    if(window.confirm('You\'re deleting a user ?')) {
      dispatch(deleteUser(id))
      dispatch(reset())
    }
  }

  useEffect(() => {
    if(auth && auth.isAdmin == 'true' || isDeleteUserSuccess) {
      dispatch(getUsers())
    } else {
      navigate('/')
    }
  }, [dispatch, auth, isDeleteUserSuccess])

  return (
    <>
      <h1>Users</h1>
      {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>{user.isAdmin == 'true' ? <>YES</> : 'NO'}</td>
                <td>
                  <LinkContainer to={`/admin/update/user/${user._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm'
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
