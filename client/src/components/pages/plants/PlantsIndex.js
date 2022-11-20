import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Chakra imports
import { Container, Box, SimpleGrid } from '@chakra-ui/react'
import { Card, CardBody, Image, Heading, Button } from '@chakra-ui/react'

const PlantsIndex = () => {
  
  const [plants, setPlants] = useState([])

  useEffect(() => {
    const getPlants = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPlants()
  })
  
  return (
    <>
      <h1>All Plants</h1>
    </>
  )  
}

export default PlantsIndex