import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import ImageUpload from '../../ImageUpload'

// Chakra imports
import { Container, Box, Image, Button, Select, Input } from '@chakra-ui/react'

const BlogNew = () => {
  // ! State
  const [ formFields, setFormFields ] = useState({
    title: '',
    category: '',
    tags: '',
    description: '',
    thumbnail: '',
    article: '',
  })
  // Variable to store raw blog data to use to dropdown filters
  const [ blogs, setBlogs ] = useState([])

  // Variables to store filtered categories and tags
  const [ categories, setCategories ] = useState([])
  const [ tags, setTags ] = useState([])

  const navigate = useNavigate()



  // ! Execution
  // submit blog to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/blogs', formFields)
      console.log('SUCCESS', data._id)
      navigate(`/api/blogs/${data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  // Get values and add to formfields object 
  const handleChange = (e) => {
    console.log(`${e.target.name} - ${e.target.value}`)
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  // Get data from blogs to populate categories ang tags dropdowns
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/blogs')
        setBlogs(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    filterCategories()
    filterTags()
  }, [blogs])
  // Filters blog data to extract all the categories and creates a new set with no duplicate categories
  const filterCategories = () => {
    const filter = [ ...new Set(blogs.map(blog => blog.category))].sort()
    setCategories(filter)
  }
  const filterTags = () => {
    const filter = [ ...new Set(blogs.map(blog => blog.tags))].sort()
    setTags(filter)
  }



  return (
    <main className="blog-form-page">
      <Container w={[350, null, 500, null, 997]} m={2} maxW="997px">
        <Box className="blog-form-title">
          <Link to={'/blogs'}>
            <Button variant='ghost' m="0" p="1">Back</Button>
          </Link>
          <h1>Add Blog</h1>
        </Box>
        <Box className="blog-form">
          <form onSubmit={handleSubmit}>
            <Box>
              {/* Title */}
              <label htmlFor="title">Title <span className="required">*</span></label>
              <Input 
                type='text'
                name="title"
                onChange={handleChange}
                placeholder="Title"
                required 
              />
              {/* Category */}
              <label htmlFor="category">Category <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="category" onChange={handleChange} placeholder='Select Category' required>
                {categories.map((item, i) => {
                  return <option key={i} value={item}>{item}</option>
                })}
              </Select>
              {/* Tags */}
              <label htmlFor="tags">Tags <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="tags" onChange={handleChange} placeholder='Select Tags' required>
                {tags.map((item, i) => {
                  return <option key={i} value={item}>{item}</option>
                })}
              </Select>
              {/* Description */}
              <label htmlFor="description">Description <span className="required">*</span></label>
              <Input 
                type='text'
                name="description"
                onChange={handleChange}
                placeholder="Description"
                required 
              />
              {/* Thumbnail */}
              <ImageUpload
                formFields={formFields}
                setFormFields={setFormFields}
                required 
              />
              {/* Article */}
              <label htmlFor="article">Article <span className="required">*</span></label>
              <Input 
                type='text'
                name="article"
                onChange={handleChange}
                placeholder="Article"
                required 
              />
              <Button className="btn-green">Add Blog</Button>
            </Box>
          </form>
        </Box>
      </Container>
    </main>
  )
}

export default BlogNew