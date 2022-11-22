import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import HeightCheckBox from './HeightCheckbox.js'

// Chakra imports
import { Container, Box, SimpleGrid, Flex } from '@chakra-ui/react'
import { Card, CardBody, Image, Heading, Button } from '@chakra-ui/react'

const PlantsIndex = () => {
  
  const [plants, setPlants] = useState([])
  const [filteredPlants, setFilteredPlants] = useState([])

  useEffect(() => {
    const getPlants = async () => {
      try {
        const { data } = await axios.get('/api/plants')
        setPlants(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPlants()
  },[])

  // const filterPlants = () => {
  //   // const regex = new RegExp(search, 'i')
  //   return (
  //     plants.filter(plant => {
  //       const { plantHeight } = plant
  //       return (
  //         plantHeight === 
  //       )
  //     })
  //   )
  // }
  useEffect(() => {
    console.log(filteredPlants)
  }, [filteredPlants])

  return (
    <>
      <h1>All Plants</h1>
      <main className="plants-index">
        <HeightCheckBox plants={plants} setFilteredPlants={setFilteredPlants} filteredPlants={filteredPlants} />
        <Container m={2} maxW="997px">
          <SimpleGrid minChildWidth="250px" spacing='30px'>
            {filteredPlants.length > 0 &&
              filteredPlants.map(plant => {
                const { _id, name, imageURL } = plant
                return (
                  <Link key={_id} to={`/plants/${_id}`}>
                    <Card className="plants-index-cards">
                      <CardBody>
                        <Image src={imageURL} alt={name} />
                        <Heading mt="2" size='md'>{name}</Heading>
                      </CardBody>
                    </Card>
                  </Link>
                )
              })}
          </SimpleGrid>  
          
        </Container>
      </main>
    </>
  )  
}

export default PlantsIndex

// mainDescription, lightDescription, waterDescription, tempDescription, humidityDescription, heightDescription, toxicityDescription