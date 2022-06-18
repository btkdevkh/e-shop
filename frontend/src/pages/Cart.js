import React, { useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, removeCartItem } from '../features/cart/cartSlice'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { API_URL } from '../config'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.carts)

  const params = useParams()
  const [searchParams] = useSearchParams()
  const qty = searchParams.get('qty');
  const cart = { id: params.id, qty: Number(qty) }

  const handleCheckout = () => {
    navigate('/login?redirect=shipping')
  }

  useEffect(() => {
    if(params.id) dispatch(addCartItem(cart))
  }, [dispatch, params.id])

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
          <ListGroup>
            {cartItems.map(item => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={API_URL + item.image} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control 
                      as='select' 
                      value={item.qty} 
                      onChange={(e) => {                        
                        dispatch(addCartItem({ id: item._id, qty: Number(e.target.value) }))
                      }}>
                      {[...Array(parseInt(item.countInStock)).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={() => {
                      dispatch(removeCartItem(item))
                    }}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) }
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h5>Subtotal ({cartItems.reduce((acc, crr) => acc + crr.qty, 0)}) items</h5>
              ${cartItems.reduce((acc, crr) => acc + crr.qty * crr.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button 
                type='button' 
                className='btn-block' 
                disabled={cartItems.length === 0} 
                onClick={handleCheckout}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default Cart
