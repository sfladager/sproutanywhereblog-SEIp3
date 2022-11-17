import express from 'express'
import { getAllBlogs } from '../controllers/blogs.js'
import { registerUser, loginUser } from '../controllers/auth.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

export default router