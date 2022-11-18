
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, SimpleGrid } from '@chakra-ui/react'

const BlogSingle = () => {
  // ! State
  const [ blogs, setBlogs ] = useState([])

  const { blogsId } = useParams()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogsId}`)
        setBlogs(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [blogsId])

  return (
    <main className="succulents-blog-index">
      <Container m={2} maxW="997px">
        <h1>Single Bread PAGE!</h1>
      </Container>
    </main>
  )
}

export default BlogSingle