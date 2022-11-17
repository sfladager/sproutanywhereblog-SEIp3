import express from 'express'
import { getAllBlogs } from '../controllers/blogs.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)



export default router