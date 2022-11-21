import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'

import Navbar from './components/navbar/Navbar'

// Imported Components
import Home from './components/pages/Home'
import SucculentsBlogs from './components/pages/blogs/SucculentsBlogs'
import PlantsIndex from './components/pages/plants/PlantsIndex'
import PlantSingle from './components/pages/plants/PlantSingle'


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
          <Navbar />
          <Routes>
            <Route path="/plants" element={<PlantsIndex />} />
            <Route path="/plants/:id" element={<PlantSingle />} />
            <Route path="/" element={<Home />} />
            <Route path="/blogs/category/succulents" element={<SucculentsBlogs />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}

export default App
