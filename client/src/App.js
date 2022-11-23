import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'

import { ChakraProvider } from '@chakra-ui/react'
// Imported Components
import PlantsIndex from './components/pages/plants/PlantsIndex'
import PlantSingle from './components/pages/plants/PlantSingle'
import PlantsNew from './components/pages/plants/PlantNew'

import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import BlogSingle from './components/pages/blogs/BlogSingle'
import BlogNew from './components/pages/blogs/BlogNew'
import BlogEdit from './components/pages/blogs/BlogEdit'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'

import Home from './components/pages/Home'

const App = () => {

  return (
    <ChakraProvider>
      <div className="site-wrapper">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/plants" element={<PlantsIndex />} />
            <Route path="/plants/:id" element={<PlantSingle />} />
            <Route path="/plants/new" element={<PlantsNew />} />
            <Route path="/" element={<Home />} />
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
