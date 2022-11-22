
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { $generateHtmlFromNodes, $generateNodesFromDOM, html } from '@lexical/html'
import { $getHtmlContent } from '@lexical/clipboard'
import { $getRoot } from 'lexical'
import parse from 'html-react-parser'

// Chakra imports
import { Container, Box, Image, Button, ButtonGroup } from '@chakra-ui/react'

const BlogSingle = () => {
  // ! State
  const [ blog, setBlog ] = useState([])
  const [ article, setArticle ] = useState()
  const [ errors, setErrors ] = useState(null)

  const { blogsId } = useParams()
  const navigate = useNavigate()

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blogs/${blogsId}`)
        setArticle(data.article)
        setBlog(data)
      } catch (err) {
        console.log(err)
        setErrors(err.response.data)
      }
    }
    getData()
  }, [blogsId])

  useEffect(() => {
    console.log(article)
    
  }, [article])

  const deleteBlog = async (e) => {
    try {
      await axios.delete(`/api/blogs/${blogsId}`)
      navigate(`/blogs/category/${blog.category}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="single-blog">
      <Container m={2} maxW="997px">
        <Link to={`/blogs/category/${blog.category}`}>
          <Button variant='ghost' m="0" p="1">Back</Button>
        </Link>
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
              {article && parse(article)}
            </Box>
            <Box>
              <ButtonGroup gap='2'>
                <Link to={`/blogs/${blogsId}/edit`}><Button className="btn-green">Edit</Button></Link>
                <Button onClick={deleteBlog} colorScheme='red'>Delete</Button>
              </ButtonGroup>
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