import express from 'express'
import { getAllBlogs, addBlog, getSingleBlog, updateBlog, deleteBlog, getSucculentBlogs } from '../controllers/blogs.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)
  .post(addBlog)

router.route('/blogs/:id')
  .get(getSingleBlog)
  .put(updateBlog)
  .delete(deleteBlog)

router.route('/blogs/:category')
  .get(getSucculentBlogs)  


export default router