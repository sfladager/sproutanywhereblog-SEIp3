
import Blog from '../models/blog.js'

// Helper Function
// Selects blog by Id with findById(id) and reuse when need to find by id
// async function
// destructure id with params
// find blog with 
// export const findBlog = async (req, res) => {
//   try {
//     const { id } = req.params
//     const blog = await Blog.findById(id)
//     return blog
//   } catch (err) {
//     console.log(err)
//   }
// }


// * Index route
// Method: GET
// Endpoint: /blogs
// Description: Query the entire blogs collection, to return all blogs
export const getAllBlogs = async (req, res) => {
  try {
    console.log('PARAMS', req)
    const blogs = await Blog.find()
    return res.json(blogs)
  } catch (err) {
    console.log(err)
  }
}

export const getSucculentBlogs = async (req, res) => {
  try {
    console.log('GET ALL SUCCULENTS INDEX', req)
    // const blog = await Blog.find({ category: 'succulents' })
    // console.log(blog)
  } catch (err) {
    console.log(err)
    console.log(err.name)
    console.log(err.message)
  }
}

// * Add Blog route
// Method: Post
// Endpoint: /blogs
// Description: add a blog to the collection with create method
export const addBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body })
    return res.status(201).json(blog)
  } catch (err) {
    console.log(err)
  }
}

// * Single Blog route
// Method: GET
// Endpoint: /blogs/:id
// Description: return a single blog that matches the id from params and using the helper function to findById
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id)
    return res.json(blog)
  } catch (err) {
    console.log(err)
  }
}

// * Update Blog Route
// Method: Put
// Endpoint: /blogs/:id
// Description: Find a specific blog with helper function, and assign req.body with Object.assign and save blog with save method
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog) {
      Object.assign(blog, req.body)
      blog.save()
      return res.status(202).json(blog)
    }
  } catch (err) {
    console.log(err)
  }
}
// * Delete Blog Route
// Method: delete
// Endpoint: /blogs/:id
// Description: Locates the correct blog and removes it from the collection
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog) {
      await blog.remove()
      return res.sendStatus(204)
    }
  } catch (err) {
    console.log(err)
  }
}