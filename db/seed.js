import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Plant from '../models/plant.js'
import plantData from './data/plants.js'
// import Blog from '../models/blog.js'
// import blogData from './data/blogs.js'
import User from '../models/user.js'
import userData from './data/users.js'

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('🚀 Database connected!')

    await mongoose.connection.db.dropDatabase()
    console.log('👍 Database dropped!')

    const users = await User.create(userData)
    console.log(`👤 Users collection seeded with ${users.length} users!`)

    const plantsWithOwners = plantData.map(plant => {
      return { ...plant, owner: users[0]._id }
    })

    const plants = await Plant.create(plantsWithOwners)
    console.log(plants)
    console.log(`🌱 Plants collection seeded with ${plants.length} plants`)





    await mongoose.connection.close()
    console.log('👋 Goodbye!')

  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDatabase()