import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
// Imported Components
import Home from './components/pages/Home'
import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'

const App = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <ChakraProvider>
      <div className="site-wrapper">
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/category/succulents" element={<SucculentsBlogs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
