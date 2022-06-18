import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { API_URL } from '../config'
import { Link } from 'react-router-dom'
import { getOrderById, payOrder, orderDelivered, reset } from '../features/order/orderSlice'
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";

export default function Order() {
  const [sdkReady, setSdkReady] = useState(false)

  const { id } = useParams()

  const dispatch = useDispatch()
  const { orderDetails, isSucess: successPay, error, message, isLoading: loadingPay, isDeliveredSuccess } = useSelector(state => state.order)

  const { auth } = useSelector(state => state.auth)

  const itemsPrice = addDecimals(orderDetails && orderDetails.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));

  function addDecimals(number) {
    return (Math.round(number * 100) / 100).toFixed(2)
  }

  const handleSuccessPayment = (paymentResult) => {
    console.log('paymentResult', paymentResult);
    dispatch(payOrder({id, paymentResult}))
    if(paymentResult.status === "COMPLETED") {
      window.location.reload()
    }
  }

  const deliveredHandler = () => {
    dispatch(orderDelivered(id))
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(`${API_URL}/v1/api/config/paypal`)
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      }

      window.document.body.appendChild(script);
    }

    if(!orderDetails || successPay || orderDetails._id !== id) {
      dispatch(getOrderById(id))
    } 

    if(orderDetails && !orderDetails.isPaid) {
      if(!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }

    if(isDeliveredSuccess) {
      window.location.reload()
    }

  }, [dispatch, id, successPay, isDeliveredSuccess])

  return error ? <Message variant='danger'>{message}</Message> : <>
    {orderDetails && (
      <>
        <h1>Order {orderDetails._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong> {orderDetails.user.name}</p>
                <p><strong>Email: </strong> <a href={`mailto:${orderDetails.user.email}`}>{orderDetails.user.email}</a></p>
                <p>
                  <strong>Address: </strong>
                  {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.postalCode} {orderDetails.shippingAddress.city} {orderDetails.shippingAddress.country}
                </p>
                {orderDetails.isDelivered ? <Message variant='success'>Delivered on {orderDetails.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {orderDetails.paymentMethod}
                </p>
                {orderDetails.isPaid ? <Message variant='success'>Paid on {orderDetails.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {orderDetails.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {orderDetails.orderItems.map((item, idx) => (
                      <ListGroup.Item key={idx}>
                        <Row>
                          <Col md={1}>
                            <Image src={API_URL + item.image} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${orderDetails.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${orderDetails.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${orderDetails.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!orderDetails.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? <Loader /> : (
                      <PayPalButton
                        amount={orderDetails.totalPrice}
                        onSuccess={handleSuccessPayment}
                      />
                    )}
                  </ListGroup.Item>
                )}

                { 
                  auth && 
                  auth.isAdmin && 
                  orderDetails.isPaid && 
                  !orderDetails.isDelivered && (
                    <ListGroup.Item>
                      <Button type='button' className='btn btn-block'
                        onClick={deliveredHandler}
                      >
                        Mark as delivered
                      </Button>
                    </ListGroup.Item>
                  )
                }
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )}
  </>
}
