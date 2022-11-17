import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Plant from '../models/plant.js'
import plantData from './data/plants.js'
// import User from '../models/user.js'
// import userData from './data/users.js'
// import Blog from '../models/blog.js'
// import blogData from './data/blogs.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🔌 database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('💧 database dropped')

    const plants = await Plant.create(plantData)
    console.log(plants)
    console.log(`🌱 Plants collection seeded with ${plants.length} plants`)

    await mongoose.connection.close()
    console.log('🔒 connection closed')

  } catch (err) {
    console.log(err)
  }
}
seedDatabase()