import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { getToken, isOwner } from '../../../helpers/auth'

// Chakra imports
import { Container, Box, SimpleGrid, Flex, Spacer, Text, Card, CardBody, Image, Heading, Button, ButtonGroup } from '@chakra-ui/react'
import { FaAmazon } from 'react-icons/fa'
import lightIcon from '../../../assets/light-icon.webp'
import waterIcon from '../../../assets/water-icon.webp'
import tempIcon from '../../../assets/temp-icon.webp'
import humidIcon from '../../../assets/humid-icon.webp'
import timeIcon from '../../../assets/time-icon.webp'
import petIcon from '../../../assets/pet-icon.webp'


const PlantsIndex = () => {
  
  const [plant, setPlant] = useState([])
  const [error, setError] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const getPlant = async () => {
      try {
        const { data } = await axios.get(`/api/plants/${id}`)
        setPlant(data)
      } catch (err) {
        setError(true)
      }
    }
    getPlant()
  },[id])
  
  const { name, thumbnail, mainDescription, lightDescription, waterDescription, tempDescription, humidityDescription, heightDescription, toxicityDescription } = plant

  useEffect(() => {
    console.log(plant)
    console.log(plant.owner)
  },[plant])

  const deletePlant = async (e) => {
    try {
      await axios.delete(`/api/plants/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/plants')
    } catch (err) {
      console.log(err)
    }
  }

  const amazonClick = () => {
    window.open(
      `https://www.amazon.co.uk/s?k=${name}`
    )
  }

  return (
    <>
      <main className="plant-single">
        <Flex>
          
        </Flex>
        <Container className="plant-container">
          { plant ?
            <>
              <h1><strong>{name}</strong></h1>
              <Button bg="rgba(255,153,0,1)" 
                _hover={{ backgroundColor: 'rgba(255,130,0,1)' }} 
                boxShadow="xl" 
                leftIcon={<FaAmazon />}
                onClick={amazonClick}>Buy on Amazon</Button>
              <img src={thumbnail} alt={name}/>
              <p>{mainDescription}</p>
              <Flex className="plant-info-guide-title-container">
                <p className="plant-info-guide-title">{name} Care &amp; Info Guide</p>
              </Flex>
              <Flex className="plant-info-container">
                <Flex className="plant-info light-info">
                  <img src={lightIcon} />
                  <p className="plant-info-subtitle">Light</p>
                  <p>{lightDescription}</p>
                </Flex>
                <Flex className="plant-info water-info">
                  <img src={waterIcon} />
                  <p className="plant-info-subtitle">Watering</p>
                  <p>{<p>{waterDescription}</p>}</p>
                </Flex>
                <Flex className="plant-info temp-info">
                  <img src={tempIcon} />
                  <p className="plant-info-subtitle">Temperature</p>
                  <p>{tempDescription}</p>
                </Flex>
                <Flex className="plant-info humid-info">
                  <img src={humidIcon} />
                  <p className="plant-info-subtitle">Humidity</p>
                  <p>{humidityDescription}</p>
                </Flex>
                <Flex className="plant-info growth-info">
                  <img src={timeIcon} />
                  <p className="plant-info-subtitle">Height &amp; Growth Rate</p>
                  <p>{heightDescription}</p>
                </Flex>
                <Flex className="plant-info toxic-info">
                  <img src={petIcon} />
                  <p className="plant-info-subtitle">Toxicity</p>
                  <p>{toxicityDescription}</p>
                </Flex>
              </Flex>
              <Box>
                {/* This checks if the owner of the plant is viewing the page, and if so, displays the edit/delete buttons */}
                {isOwner(plant.owner) &&
                  <ButtonGroup gap='2'>
                    <Link to={`/plants/${id}/edit`}><Button className="btn-green">Edit</Button></Link>
                    <Button onClick={deletePlant} colorScheme='red'>Delete</Button>
                  </ButtonGroup>
                }
              </Box>
            </>
            :
            error ?
              <div className="error">
                <h2 className="error-text display-6">Something went wrong, try again later.</h2>
              </div>
              :
              <h2>Loading...</h2>
          }     
        </Container>
      </main>
    </>
  )  
}

export default PlantsIndex
