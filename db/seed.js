import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
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

    await mongoose.connection.close()
    console.log('👋 Goodbye!')

  } catch (err) {
    console.log('🆘 Something went wrong')
    console.log(err)
    await mongoose.connection.close()
  }
}
seedDatabase()