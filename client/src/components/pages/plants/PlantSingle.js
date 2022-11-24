import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getToken } from '../../../helpers/auth'


// Chakra imports
import { Container, Box, SimpleGrid, Flex, Spacer, Text, Card, CardBody, Image, Heading, Button } from '@chakra-ui/react'
import lightIcon from '../../../assets/light-icon.webp'
import waterIcon from '../../../assets/water-icon.webp'
import tempIcon from '../../../assets/temp-icon.webp'
import humidIcon from '../../../assets/humid-icon.webp'
import timeIcon from '../../../assets/time-icon.webp'
import petIcon from '../../../assets/pet-icon.webp'

const PlantsIndex = () => {

  const [plant, setPlant] = useState(null)
  const [error, setError] = useState(false)
  const [reviewField, setReviewField] = useState({
    text: '',
  })

  const { id } = useParams()

  useEffect(() => {
    const getPlant = async () => {
      try {
        // console.log(plant)
        const { data } = await axios.get(`/api/plants/${id}`)
        // console.log(data)
        setPlant(data)

      } catch (err) {
        setError(true)
      }
    }
    getPlant()
  }, [id])

  // useEffect(() => {
  //   console.log('plant: ' + plant)
  // }, [plant])
  // const { name, thumbnail, mainDescription, lightDescription, waterDescription, tempDescription, humidityDescription, heightDescription, toxicityDescription, reviews, owner } = plant

  // useEffect(() => {
  //   setPlant({ ...plant, reviews: reviewField.text })
  //   console.log(plant)
  // }, [reviewField])

  const handleChange = (e) => {
    const updatedReviewField = {
      ...reviewField,
      [e.target.name]: e.target.value,
    }
    setReviewField(updatedReviewField)
    if (error) setError('')
  }

  const handleClick = async (e) => {
    try {
      console.log(plant)
      const { data } = await axios.post(`/api/plants/${id}/review`, { ...plant, reviews: reviewField }, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('EDIT SUCCESS ->', data)
    } catch (err) {
      console.log('EDIT FAIL ->', err)
      setError(err.response.data)
    }
  }

  return (
    <>
      <h1>Plant</h1>
      <main className="plant-single">
        <Flex>

        </Flex>
        <Container className="bread-container">
          {plant ?
            <>
              <h1><strong>{plant.name}</strong></h1>
              <img src={plant.thumbnail} alt={name} />
              <p>{plant.mainDescription}</p>
              <Flex className="plant-info-guide-title-container">
                <p className="plant-info-guide-title">{name} Care &amp; Info Guide</p>
              </Flex>
              <Flex className="plant-info-container">
                <Flex className="plant-info light-info">
                  <img src={lightIcon} />
                  <p className="plant-info-subtitle">Light</p>
                  <p>{plant.lightDescription}</p>
                </Flex>
                <Flex className="plant-info water-info">
                  <img src={waterIcon} />
                  <p className="plant-info-subtitle">Watering</p>
                  <p>{<p>{plant.waterDescription}</p>}</p>
                </Flex>
                <Flex className="plant-info temp-info">
                  <img src={tempIcon} />
                  <p className="plant-info-subtitle">Temperature</p>
                  <p>{plant.tempDescription}</p>
                </Flex>
                <Flex className="plant-info humid-info">
                  <img src={humidIcon} />
                  <p className="plant-info-subtitle">Humidity</p>
                  <p>{plant.humidityDescription}</p>
                </Flex>
                <Flex className="plant-info growth-info">
                  <img src={timeIcon} />
                  <p className="plant-info-subtitle">Height &amp; Growth Rate</p>
                  <p>{plant.heightDescription}</p>
                </Flex>
                <Flex className="plant-info toxic-info">
                  <img src={petIcon} />
                  <p className="plant-info-subtitle">Toxicity</p>
                  <p>{plant.toxicityDescription}</p>
                </Flex>
                <Flex className="plant-info review-info">
                  <img src={petIcon} />
                  <p className="plant-info-subtitle">Reviews</p>
                  <p>{plant.reviews}</p>
                </Flex>
              </Flex>
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
        <input
          type="text"
          name="text"
          onChange={handleChange}
          // value={reviewField.text}
          placeholder="Review"
        />
        <button className="btn-post" onClick={handleClick}>Post review</button>
      </main>
    </>
  )
}

export default PlantsIndex
