import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container, Box, Image, Button, Select, Input, Flex, filter } from '@chakra-ui/react'
import { MdContactSupport, MdFaceRetouchingOff } from 'react-icons/md'

const Home = () => {

  const [plants, setPlants] = useState([])
  const [plantsCompared, setPlantsCompared] = useState([])
  const locations = ['office', 'living room', 'bedroom', 'bathroom', 'balcony', 'kitchen']
  const sunlights = [
    {
      amount: 'small', 
      desc: 'less than 1 hour daily',
    }, 
    {
      amount: 'medium',
      desc: '1 to 2 hours daily',
    }, 
    {
      amount: 'large',
      desc: 'more than 2 hours daily',
    }
  ]
  const heights = [
    {
      amount: 'small', 
      desc: 'small - less than 50cm',
    }, 
    {
      amount: 'medium',
      desc: 'medium - 50cm to 100cm',
    }, 
    {
      amount: 'large',
      desc: 'large - more than 100cm', 
    }
  ] 
  
  const [action, setAction] = useState(null)
  const [filters, setFilters] = useState({})
  
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

  const handleActionChange = (e) => {
    setAction(e.target.value)
  }

  const handleChange = (e) => {
    const key = e.target.id
    const value = e.target.value
    if (key === 'beginnerFriendly' || key === 'safeForPetsOrChildren') {
      return setFilters({ ...filters, [key]: value === 'true' }) // returns boolean
    }
    return setFilters({ ...filters, [key]: value })
  }

  // useEffect(() => {
  //   console.log(filters)
  // },[filters])

  // useEffect(() => {
  //   console.log(action)
  // },[action])


  const handleSubmit = (e) => {
    e.preventDefault()
    const plantsToSet = []
    plants.forEach(plant => {
      let matchingFilters = 0
      for (const filter in filters) {
        if (filter === 'idealLocation') {
          plant[filter].includes(filters[filter]) && matchingFilters++
        }
        (plant[filter] === filters[filter] && matchingFilters++)
      }
      const plantWithMatch = { ...plant, matches: matchingFilters }
      plantsToSet.push(plantWithMatch)
    })
    setPlantsCompared(plantsToSet)
  }

  useEffect(() => {
    // console.log(plantsCompared)
    const sortedPlants = plantsCompared.sort((a,b) => (b.matches < a.matches) ? -1 : ((a.matches > b.matches) ? 1 : 0))
  },[plantsCompared])

  return (
    <>
      <h2>What are you looking for?</h2>
      <Flex
        align="center">
        <p>I want to</p> 
        <select className="home-buy-learn-select" onChange={handleActionChange}>
          <option value="" disabled selected></option>
          <option value="learn">learn about plants</option>
          <option value="buy">buy plants</option>
        </select>
      </Flex>
      { action === null ? 
        <h2>Start your journey here!</h2>
        :
        action === 'buy' ? 
          <Box>
            <h2>Find your perfect match!</h2>
            <form onSubmit={handleSubmit}>
              <p>My new friend will be staying in the</p>
              <select className="home-location-select" id="idealLocation" onChange={handleChange}>
                <option value="" disabled selected></option>
                {locations.map(location => {
                  return <option key={location} value={location}>{location}</option>
                })}
              </select>
              <p>This location provides sunlight exposure for</p>
              <select className="home-sunlight-select" id="sunlightRequired" onChange={handleChange}>
                <option value="" disabled selected></option>
                {sunlights.map(sunlight => {
                  return <option key={sunlight.amount} value={sunlight.amount}>{sunlight.desc}</option>
                })}
              </select>
              <p>I love plants that are</p>
              <select className="home-height-select" id="plantHeight" onChange={handleChange}>
                <option value="" disabled selected></option>
                {heights.map(height => {
                  return <option key={height.amount} value={height.amount}>{height.desc}</option>
                })}
              </select>
              <p>and I am</p>
              <select className="home-beginner-select" id="beginnerFriendly" onChange={handleChange}>
                <option value="" disabled selected></option>
                <option value={false}>a natural talent</option>
                <option value={true}>not the best</option>
              </select>
              <p>in care.</p>
              <p>Pets?</p>
              <select className="home-toxic-select" id="safeForPetsOrChildren" onChange={handleChange}>
                <option value="" disabled selected></option>
                <option value={false}>My plants are my pets</option>
                <option value={true}>My plants need to be pet-friendly</option>
              </select>
              <Button onSubmit={handleSubmit} type="submit" className="btn-green" 
                disabled={Object.keys(filters).length !== 5}>Show me something!
              </Button>
            </form> 
          </Box>
          :
          <h2> what to read...?</h2>
      }
    </>
  )  
}

export default Home

      