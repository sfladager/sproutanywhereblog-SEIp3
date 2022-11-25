import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'
// import { port, dbURI } from './config/environment.js'

import {} from 'dotenv/config'

// Deoployment imports
import 'dotenv/config' // only needs to be added if it doesn't already exist
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// ! Variables
const app = express()

// ! Listen from requests
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('🚀Database running!')

    // ! Middleware
    // * Parser
    app.use(express.json())

    // * Genaric logger
    app.use((req, res, next) => {
      console.log(`Request recieved: ${req.method} - ${req.url}`)
      next()
    })

    // * Router
    app.use('/api', router)

    // * Catch others
    app.use((_req, res) => res.status(404).json('Page Not Found'))

    // ! Start server
    app.listen(process.env.PORT, console.log(`🚀Sever running on port ${process.env.PORT}`))

  } catch (err) {
    console.log(err)
  }
}
startServer()

// Router
app.use('/api', router)

// ** New lines **
app.use(express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})