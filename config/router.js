import express from 'express'
import { getAllBlogs } from '../controllers/blogs.js'
import { addPlant, deletePlant, getAllPlants, getPlantsByCategory, getSinglePlant, updatePlant } from '../controllers/plants.js'


const router = express.Router()


router.route('/blogs')
  .get(getAllBlogs)

router.route('/plants')
  .get(getAllPlants)
  .post(addPlant)

router.route('/plants/category/:category')
  .get(getPlantsByCategory)
  
router.route('/plants/:id')
  .get(getSinglePlant)
  .put(updatePlant)
  .delete(deletePlant)





export default router