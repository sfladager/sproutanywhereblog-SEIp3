import express from 'express'
import { getAllBlogs, addBlog, getSingleBlog, updateBlog, deleteBlog, getSucculentBlogs } from '../controllers/blogs.js'
import { registerUser, loginUser } from '../controllers/auth.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)

router.route('/register')
  .post(registerUser)
router.route('/blogs/:category')
  .get(getSucculentBlogs)  

router.route('/login')
  .post(loginUser)

export default router