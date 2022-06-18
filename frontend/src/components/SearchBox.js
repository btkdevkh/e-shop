import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate(`/`)
    }
  }

  return (
    <Form onSubmit={handleSearch} className="d-flex">
      <Form.Control
        type="search"
        name='q'
        placeholder='Search products...'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>

      <Button 
        type='submit' 
        variant='outline-success' 
        className='p-2'
      >
        Search
      </Button>
    </Form>
  )
}
