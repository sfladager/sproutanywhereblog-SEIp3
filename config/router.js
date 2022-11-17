import express from 'express'
import { getAllBlogs, addBlog, getSingleBlog, updateBlog, deleteBlog, getBlogsCategory, getBlogsCategoryAndTags } from '../controllers/blogs.js'
import { addPlant, deletePlant, getAllPlants, getPlantsByCategory, getSinglePlant, updatePlant } from '../controllers/plants.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { findAllUsers } from './helpers.js'
import { findSingleUser } from './helpers.js'
import { updateUser } from '../controllers/users.js'
import secureRoute from './secureRoute.js'
// import { updateProfile } from '../controllers/users.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)
  .post(addBlog)

router.route('/blogs/:id')
  .get(getSingleBlog)
  .put(updateBlog)
  .delete(deleteBlog)

router.route('/blogs/category/:category')
  .get(getBlogsCategory)

router.route('/blogs/category/:category/:tags')
  .get(getBlogsCategoryAndTags)

router.route('/plants')
  .get(getAllPlants)
  .post(addPlant)

router.route('/plants/category/:category')
  .get(getPlantsByCategory)
  
router.route('/plants/:id')
  .get(getSinglePlant)
  .put(updatePlant)
  .delete(deletePlant)



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