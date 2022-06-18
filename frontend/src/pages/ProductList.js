import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getProducts, deleteProduct, createProduct, reset } from '../features/product/productSlice'
import Paginate from '../components/Paginate'

export default function ProductList() {
  const navigate = useNavigate()
  const params = useParams()

  const pageNumber = Number(params.pageNumber) || 1

  const dispatch = useDispatch()
  const { isLoading, isError, products, isDeleteSuccess, isCreateSuccess, message, product, page, pages } = useSelector(state => state.products)
  const { auth } = useSelector(state => state.auth)

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const handleDeleteProduct = (id) => {
    if(window.confirm('You\'re deleting a product ?')) {
      dispatch(deleteProduct(id))
      dispatch(reset())
    }
  }

  useEffect(() => {
    if(auth && auth.isAdmin === 'true') {
      dispatch(getProducts({ keyword: '', pageNumber }))
    } else {
      navigate('/')
    }
      
    if(product && isCreateSuccess) {
      dispatch(reset())
      navigate('/admin/product/update/' + product._id)
    }
  }, [dispatch, auth, isDeleteSuccess, isCreateSuccess, pageNumber])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button 
            className='my-3'
            onClick={createProductHandler}
          >
            <i className='fas fa-plus'> Add</i>
          </Button>
        </Col>
      </Row>
      {isLoading ? <Loader /> : isError ? <Message variant='danger'>{message}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}$</td>
                <td>{product.category}</td>
                <td>
                  <LinkContainer to={`/admin/product/update/${product._id}`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm'
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Paginate page={page} pages={pages} isAdmin={true} />
    </>
  )
}
