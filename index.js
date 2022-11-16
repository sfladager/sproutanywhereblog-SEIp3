import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
import { port, dbURI } from './config/environment.js'


// ! Variables
const app = express()

// ! Listen from requests
const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database running!')
    
    // ! Middleware
    // * Parser
    app.use(express.json())

    // * Genaric logger
    app.use((req, res, next) => {
      console.log(`Request recieved: ${req.method} - ${req.url}`)
      next()
    })

    // * Router
    app.use(router)

    // * Catch others
    app.use((_req, res) => res.status(404).json('Page Not Found'))

    // ! Start server
    app.listen(port, console.log(`Sever running on port ${port}`))
    
  } catch (err) {
    console.log(err)
  }
}
startServer()