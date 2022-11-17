import express from 'express'
import { getAllBlogs } from '../controllers/blogs.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { findAllUsers } from './helpers.js'
import { findSingleUser } from './helpers.js'
import { updateUser } from '../controllers/users.js'
import secureRoute from './secureRoute.js'
// import { updateProfile } from '../controllers/users.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/users')
  .get(findAllUsers)

router.route('/users/:id')
  .get(findSingleUser)
  .put(secureRoute, updateUser)

export default router