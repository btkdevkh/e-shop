import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(state => state.auth)

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Eliza Espresso</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
              </LinkContainer>
              {auth ? (
                <NavDropdown title={auth.name} id='username'>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => {
                      dispatch(logout())
                      window.location.reload()
                    }}
                  >
                    <i className='fas fa-user'></i> Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {auth && auth.isAdmin == 'true' && (
                <NavDropdown title={'Admin'} id='adminmenu'>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Uers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
