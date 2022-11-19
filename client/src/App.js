import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'

// Imported Components
import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import BlogSingle from './components/pages/blogs/BlogSingle'
import BlogNew from './components/pages/blogs/BlogNew'

const App = () => {


  return (
    <ChakraProvider>
      <div className="site-wrapper">
        <BrowserRouter>

          <Routes>
            
            <Route path="/blogs/category/succulents" element={<SucculentsBlogs />} />
            <Route path="/blogs/:blogsId" element={<BlogSingle />} />
            <Route path="/blogs/new" element={<BlogNew />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
