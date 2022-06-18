import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../features/cart/cartSlice'
import CheckoutSteps from '../components/CheckoutSteps'

export default function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { shippingAddress } = useSelector(state => state.carts)

  !shippingAddress && navigate('/shipping');

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check 
              type='radio' 
              label='PayPal or Credit Card' 
              id='PayPal' 
              name='paymentMethod' 
              value='PayPal' 
              checked onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className='mt-3' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}
