import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProductItem from '../components/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts, reset } from '../features/product/productSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import CarouselProduct from '../components/CarouselProduct'
import { Helmet } from 'react-helmet'

const Home = () => {
  const params = useParams()
  const { products, isError, isLoading, message, page, pages } = useSelector(state => state.products)
  const dispatch = useDispatch()

  const keyword = params.keyword
  const pageNumber = Number(params.pageNumber) || 1
  
  useEffect(() => {
    dispatch(getProducts({ keyword, pageNumber }))
    return () => dispatch(reset())
  }, [dispatch, keyword, pageNumber])

  if(isLoading) return <Loader />

  return (
    <>
      <Helmet>
        <title>Eliza Espresso</title>
        <meta name='description' content='Best Coffee Shop' />
      </Helmet>
      {!keyword && <CarouselProduct />}<br />
      <h1>Our coffees</h1>
      {isError && message && <Message variant='danger'>{message}</Message>}
      <Row>
        {products && products.length > 0 && products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
    </>
  )
}

export default Home
