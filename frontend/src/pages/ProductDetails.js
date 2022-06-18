import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form, FormGroup } from 'react-bootstrap'
import Rating from '../components/Rating';
import { API_URL } from '../config';
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset, createReview } from '../features/product/productSlice';
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductDetails = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const navigate = useNavigate()

  const params = useParams()
  const dispatch = useDispatch()
  const { products, isLoading, isError, message, isCreateReviewSuccess } = useSelector(state => state.products)
  const { auth } = useSelector(state => state.auth)

  const product = products.find(pdt => pdt._id === params.id)

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${parseInt(qty)}`)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const review = { rating, comment }
    const datas = { id: params.id, reviewData: review }
    console.log(datas.id);
    dispatch(createReview(datas))
  }

  useEffect(() => {
    if(isCreateReviewSuccess) {
      setRating(0)
      setComment('')
      dispatch(reset())
    }

    dispatch(getProducts({ keyword: '', pageNumber: ''}))
    return () => dispatch(reset())
  }, [dispatch, isCreateReviewSuccess])

  if(isLoading) return <Loader />

  return (
    <>
      {isError && message && <Message>{message}</Message>}
      {product && (
        <>
          <Link to={'/'} className='btn btn-light my-3'>Back</Link>
          <Row>
            <Col md={6}>
              <Image src={API_URL + product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating 
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col><strong>${product.price}</strong></Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                            {[...Array(parseInt(product.countInStock)).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Button 
                        type='button'
                        className='btn-block' 
                        disabled={product.countInStock > 0 ? false : true}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(rev => (
                  <ListGroup.Item key={rev._id}>
                    <strong>{rev.name}</strong>
                    <Rating rating={rev.rating} />
                    <p>{rev.createdAt.substring(0, 10)}</p>
                    <p>{rev.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {auth ? (
                    <Form onSubmit={handleReviewSubmit}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary' className='my-3'>Submit</Button>
                    </Form>
                  ) : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetails
