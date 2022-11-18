import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, SimpleGrid } from '@chakra-ui/react'
import { Card, CardBody, CardFooter, Image, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'


const SucculentsBlogs = () => {
  // ! State
  const [ blogs, setBlogs ] = useState([])

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/blogs/category/succulents')
        setBlogs(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    console.log(blogs)
  }, [blogs])

  // ! JSX
  return (
    <main className="succulents-blog-index">
      <Container m={2} maxW="997px">
        <Box p={1} mb={2} className="blog-index-filter-box">
          <h3>I want to read about<span className="blog-index-filter-selector">
            <select className="filter-blog-by-tag" id="filter-blog-by-tag" placeholder="Pick One">
              <option id="all" value="all">All</option>
              <option id="facts" value="facts">Facts</option>
            </select>
          </span></h3> 
        </Box>
        <SimpleGrid minChildWidth="250px" spacing='30px'>
          {blogs.length > 0 &&
            blogs.map(b => {
              const { _id, title, createdAt, thumbnail, description } = b
              console.log(_id, title)
              return (
                <Link key={_id} to={`/blogs/${_id}`}>
                  <Card className="blog-index-cards">
                    <CardBody>
                      <Image src={thumbnail} alt={title} />
                      <Heading mt="2" size='sm'>{title}</Heading>
                      <p className="blog-card-p">{createdAt}</p>
                      <p className="description-card-p">{description}</p>
                      <Button variant='ghost' p="0">
                        Read more
                      </Button>
                    </CardBody>
                  </Card>
                </Link>
              )
            })}
        </SimpleGrid>  
        
      </Container>
    </main>
  )
}

export default SucculentsBlogs