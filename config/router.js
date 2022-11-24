import express from 'express'
import { getAllBlogs, addBlog, getSingleBlog, updateBlog, deleteBlog, getBlogsCategory, getBlogsCategoryAndTags } from '../controllers/blogs.js'
import { addPlant, deletePlant, getAllPlants, getPlantsByCategory, getSinglePlant, updatePlant } from '../controllers/plants.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { findAllUsers } from './helpers.js'
import { findSingleUser } from './helpers.js'
import { getProfile, updateUser } from '../controllers/users.js'
import secureRoute from './secureRoute.js'
// import { updateProfile } from '../controllers/users.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)
  .post(secureRoute, addBlog)

router.route('/blogs/:id')
  .get(getSingleBlog)
  .put(secureRoute, updateBlog)
  .delete(secureRoute, deleteBlog)

router.route('/blogs/category/:category')
  .get(getBlogsCategory)

router.route('/blogs/category/:category/:tags')
  .get(getBlogsCategoryAndTags)

router.route('/plants')
  .get(getAllPlants)
  .post(secureRoute, addPlant)

router.route('/plants/category/:category')
  .get(getPlantsByCategory)

router.route('/plants/:id')
  .get(getSinglePlant)
  .put(secureRoute, updatePlant)
  .delete(secureRoute, deletePlant)



router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/users')
  .get(findAllUsers)

router.route('/user')
  .get(secureRoute, findSingleUser)

router.route('/profile')
  .put(secureRoute, updateUser)
  .get(secureRoute, getProfile)

export default router