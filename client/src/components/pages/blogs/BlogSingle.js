
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser'
import { getToken, isOwner } from '../../../helpers/auth'
import fbLogo from '../../../assets/facebook.svg'
import igLogo from '../../../assets/instagram.svg'
import pinterestLogo from '../../../assets/pinterest.svg'
import twitterLogo from '../../../assets/twitter.svg'
import whatsAppLogo from '../../../assets/whatsapp.svg'

// Chakra imports
import { Container, Box, Image, Button, ButtonGroup, Flex } from '@chakra-ui/react'

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
  function socialLinks(e){
    console.log(e.target.id)
    window.open(e.target.id, '_blank')
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
              <p className="blog-single-created-by">{ blog.createdAt } | Written by: {blog.owner.username} </p>
            </Box>
            <Box>
              <Image src={blog.thumbnail} alt={blog.title}/>
            </Box>
            <div className="social-icons">
              <img onClick={socialLinks}  id={`https://www.facebook.com/share.php?u=sproutanywhere.com/blogs/${blogsId}`} className="social-imgs" src={fbLogo} alt='FB logo' />
              <img onClick={socialLinks} id={'https://twitter.com/share?ref_src=twsrc%5Etfw'} className="social-imgs"  src={twitterLogo} alt='Twitter logo' />
              <img onClick={socialLinks} id={'http://www.instagram.com/sproutanywhere'} className="social-imgs" src={igLogo} alt='IG logo' />
              <img onClick={socialLinks} id={'https://www.pinterest.com/sproutanywhere'} className="social-imgs"  src={pinterestLogo} alt='Pinterest logo' />
              <img onClick={socialLinks} id={`whatsapp://send?text=sproutanywhere.com/blogs/${blogsId}`} className="social-imgs"  src={whatsAppLogo} alt='whatsApp logo' />
            </div>
            <Box className="blog-article">
              {article && parse(article)}
            </Box>
            <Box>
              {/* This checks if the owner of the blog is viewing the page, and if so, displays the edit/delete buttons */}
              {isOwner(blog.owner._id) &&
                <ButtonGroup mt={3} gap='2'>
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