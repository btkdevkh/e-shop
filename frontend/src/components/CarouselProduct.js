import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getTopRatedProducts } from '../features/product/productSlice'
import { API_URL } from '../config'

export default function CarouselProduct() {
  const { topRatedProducts, isError, isLoading, message } = useSelector(state => state.products)
  const dispatch = useDispatch()

  console.log(topRatedProducts);

  useEffect(() => {
    if(topRatedProducts.length === 0) {
      dispatch(getTopRatedProducts())
    }
  }, [topRatedProducts, dispatch])

  return (
    <Carousel
      pause='hover'
      className='bg-dark'
    >
      {topRatedProducts && topRatedProducts.map(p => (
        <Carousel.Item key={p._id}>
          <Link to={`/product/${p._id}`}>
            <Image src={API_URL + p.image} alt={p.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>{p.name} ({p.price}$)</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
