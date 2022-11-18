
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, Image, Button } from '@chakra-ui/react'

const BlogSingle = () => {
  // ! State
  const [ blog, setBlog ] = useState([])
  const [ errors, setErrors ] = useState(false)

  const { blogsId } = useParams()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogsId}`)
        setBlog(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [blogsId])

  return (
    <main className="single-blog">
      <Container m={2} maxW="997px">
        <Button variant='ghost' m="0" p="1">Back</Button>
        {blog ?
          <>
            <Box mt={1}>
              <h1>{ blog.title }</h1>
              <p>{ blog.createdAt } | Written by: </p>
            </Box>
            <Box>
              <Image src={blog.thumbnail} alt={blog.title}/>
            </Box>
            <Box>
              <h3>{blog.description}</h3>
            </Box>
            <Box className="social-icons">
              <p>FB, Twtter, Whatsapp, pinterst share links go here</p>
            </Box>
            <Box className="blog-article">
              {blog.article}
            </Box>
          </>  
          :
          errors ? <h2>Something went wrong!</h2> : <h2>Loading...</h2>
        }
      </Container>
    </main>
  )
}

export default BlogSingle