
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser'
import { getToken, isOwner } from '../../../helpers/auth'
import fbLogo from '../../../assets/facebook.svg'
import igLogo from '../../../assets/instagram.svg'
import twitterLogo from '../../../assets/twitter.svg'
import pinterestLogo from '../../../assets/pinterest.svg'
import whatsAppLogo from '../../../assets/whatsapp.svg'

// Chakra imports
import { Container, Box, Image, Button, ButtonGroup } from '@chakra-ui/react'

const BlogSingle = () => {
  // ! State
  const [ blog, setBlog ] = useState(null)
  const [ article, setArticle ] = useState(null)
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

  // useEffect(() => {
  //   console.log(blog.owner._id)
    
  // }, [blog])

  const deleteBlog = async (e) => {
    try {
      await axios.delete(`/api/blogs/${blogsId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate(`/blogs/category/${blog.category}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="single-blog">
      <Container m={2} maxW="997px">
        {blog ?
          <>
            <Link to={`/blogs/category/${blog.category}`}>
              <Button variant='ghost' m="0" p="1">Back</Button>
            </Link>
            <Box mt={1}>
              <h1>{ blog.title }</h1>
              <p>{ blog.createdAt } | Written by: {blog.owner.username} </p>
            </Box>
            <Box>
              <Image src={blog.thumbnail} alt={blog.title}/>
            </Box>
            <Box>
              <h3>{blog.description}</h3>
            </Box>
            <Box className="social-icons">
              <p>
                <Link to={{ pathname: 'https://www.facebook.com/sproutanywhere' }} target='_blank' >
                  <img className="social-imgs" src={fbLogo} alt='FB logo' /></Link>
                <img className="social-imgs" src={igLogo} alt='IG logo' />
                <img className="social-imgs" src={twitterLogo} alt='Twitter logo' />
                <img className="social-imgs" src={pinterestLogo} alt='Pinterest logo' />
                <img className="social-imgs" src={whatsAppLogo} alt='Whats App logo' />
              </p>
            </Box>
            <Box className="blog-article">
              {article && parse(article)}
            </Box>
            <Box>
              {/* This checks if the owner of the blog is viewing the page, and if so, displays the edit/delete buttons */}
              {isOwner(blog.owner._id) &&
                <ButtonGroup gap='2'>
                  <Link to={`/blogs/${blogsId}/edit`}><Button className="btn-green">Edit</Button></Link>
                  <Button onClick={deleteBlog} colorScheme='red'>Delete</Button>
                </ButtonGroup>
              }
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