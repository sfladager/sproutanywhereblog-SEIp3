import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
// Imported Components
import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import BlogSingle from './components/pages/blogs/BlogSingle'
import BlogNew from './components/pages/blogs/BlogNew'
import BlogEdit from './components/pages/blogs/BlogEdit'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'

const App = () => {

  return (
    <ChakraProvider>
      <div className="site-wrapper">
        <BrowserRouter>

          <Routes>
            
            <Route path="/blogs/category/succulents" element={<SucculentsBlogs />} />
            <Route path="/blogs/:blogsId" element={<BlogSingle />} />
            <Route path="/blogs/:blogsId/edit" element={<BlogEdit />} />
            <Route path="/blogs/new" element={<BlogNew />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
