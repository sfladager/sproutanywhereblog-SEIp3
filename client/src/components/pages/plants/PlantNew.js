import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

import ImageUpload from '../../ImageUpload'

// Chakra imports
import { Container, Box, Image, Button, Select, Input, Flex } from '@chakra-ui/react'

const PlantsNew = () => {

  const [ formFields, setFormFields ] = useState({
    name: '',
    imageURL: '',
    mainDescription: '',
    lightDescription: '',
    waterDescription: '',
    tempDescription: '',
    humidityDescription: '',
    heightDescription: '',
    toxicityDescription: '',
    category: '',
    idealLocation: '',
    sunlightRequired: '',
    plantHeight: '',
    beginnerFriendly: '',
    safeForPetsOrChildren: '',
  })

  // Variable to store plant data to use to dropdown filters
  // const [ newPlant, setNewPlant ] = useState([])
  const [locationArray, setLocationArray] = useState([])

  // Variables to store category, location, sunlight, height, beginner, pet
  // const [ category, setCategory ] = useState([])
  // const [ location, setLocation ] = useState([])
  // const [ sunlight, setSunlight ] = useState([])
  // const [ height, setHeight ] = useState([])
  // const [ beginner, setBeginner ] = useState([])
  // const [ pet, setPet ] = useState([])

  //Options for dropdown

  const categories = ['succulent', 'palm', 'bonsai', 'fern', 'foliage']
  const locations = ['office', 'living room', 'bedroom', 'bathroom', 'balcony', 'kitchen']
  const sunlights = [
    {
      amount: 'small', 
      desc: 'small - less than 1 hour daily',
    }, 
    {
      amount: 'medium',
      desc: 'medium - 1 to 2 hours daily',
    }, 
    {
      amount: 'large',
      desc: 'large - more than 2 hours daily',
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

  

  const navigate = useNavigate()



  // ! Execution
  // submit blog to database
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit clicked')
    try {
      const { data } = await axios.post('/api/plants', formFields)
      console.log('submite successful', data._id)
      navigate(`/api/plants/${data._id}`)
    } catch (err) {
      console.log(err)
    }
  }

  // Get values and add to formfields object 
  
  const handleChange = (e) => {
    if (e.target.name !== 'idealLocation') {
      console.log(`${e.target.name} - ${e.target.value}`)
      return setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }
    
    if (e.target.checked) {
      const newLocations = [ ...locationArray, e.target.value ] 
      setLocationArray(newLocations)
      console.log(`${e.target.name} - added ${e.target.value}`)
      return setFormFields({ ...formFields, [e.target.name]: locationArray })
    }
    if (!e.target.checked) {
      const newLocations = locationArray.filter(location => location !== e.target.value)
      setLocationArray(newLocations)
      console.log(`${e.target.name} - removed ${e.target.value}`)
      return setFormFields({ ...formFields, [e.target.name]: locationArray })
    }
  }

  useEffect(() => {
    console.log(locationArray)
  }, [locationArray])

  const handleFilter = (key, value) => {
    console.log(key)
    console.log(value)
  }

  // Get data from plants to populate categories and dropdowns
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/plants')
  //       setNewPlant(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  return (
    <main className="plant-add-page">
      <Container w={[350, null, 500, null, 997]} m={2} maxW="997px">
        <Box className="plant-add-title">
          <Link to={'/plants'}>
            <Button variant="ghost" _hover="ghost" m="0" p="1">Back</Button>
          </Link>
          <h1>Add Plant</h1>
        </Box>
        <Box className="plant-add-form">
          <form onSubmit={handleSubmit}>
            <Box>
              {/* Name */}
              <label htmlFor="title">Plant name <span className="required">*</span></label>
              <Input 
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Plant Name"
                borderColor="#9CB42F"
                required 
              />
              {/* Image */}
              <ImageUpload
                formFields={formFields}
                setFormFields={setFormFields}
                borderColor="#9CB42F"
                required 
              />
              {/* Main Description */}
              <label htmlFor="mainDescription">Main Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="mainDescription"
                onChange={handleChange}
                placeholder="Type Main Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Light Description */}
              <label htmlFor="lightDescription">Light Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="lightDescription"
                onChange={handleChange}
                placeholder="Type Light Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Watering Description */}
              <label htmlFor="waterDescription">Watering Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="waterDescription"
                onChange={handleChange}
                placeholder="Type Watering Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Temperature Description */}
              <label htmlFor="tempDescription">Temperature Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="tempDescription"
                onChange={handleChange}
                placeholder="Type Temperature Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Humidity Description */}
              <label htmlFor="humidityDescription">Humidity Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="humidityDescription"
                onChange={handleChange}
                placeholder="Type Humidity Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Height Description */}
              <label htmlFor="heightDescription">Growth and Height Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="heightDescription"
                onChange={handleChange}
                placeholder="Type Growth and Height Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Toxicity Description */}
              <label htmlFor="toxicityDescription">Toxicity Description <span className="required">*</span></label>
              <Input 
                type="text"
                name="toxicityDescription"
                onChange={handleChange}
                placeholder="Type Toxicity Description here"
                borderColor="#9CB42F"
                maxLength="500"
                required 
              />
              {/* Category */}
              <label htmlFor="category">Category <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="category" onChange={handleChange} required>
                <option value="" disabled selected>Select Plant Category</option>
                {categories.map(category => {
                  return <option key={category} value={category}>{category}</option>
                })}
              </Select>
              {/* Ideal Location */}
              <label htmlFor="idealLocation">Ideal Location <span className="required">*</span></label>
              <Flex className="plant-add-location-checkbox">
                {locations.map(location => {
                  return (
                    <Flex key={location}>
                      <input name="idealLocation" type="checkbox" 
                        value={location}
                        onChange={handleChange}
                      />
                      <label>{location}</label>
                    </Flex>
                  )
                })}
              </Flex>
              {/* Sunlight Required */}
              <label htmlFor="sunlight">Sunlight Required <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="sunlight" onChange={handleChange} required>
                <option value="" disabled selected>Select Sunlight Required</option>
                {sunlights.map(sunlight => {
                  return <option key={sunlight.amount} value={sunlight.amount}>{sunlight.desc}</option>
                })}
              </Select>
              {/* Height */}
              <label htmlFor="height">Plant Height <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="height" onChange={handleChange} required>
                <option value="" disabled selected>Select Plant Height</option>
                {heights.map(height => {
                  return <option key={height.amount} value={height.amount}>{height.desc}</option>
                })}
              </Select>
              {/* Beginner Friendly */}
              <label htmlFor="beginner">Beginner Friendly <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="beginner" onChange={handleChange} required>
                <option value="" disabled selected>Select Beginner Friendly</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
              {/* Safe for Children & Pets */}
              <label htmlFor="safe">Safe for Children &amp; Pets <span className="required">*</span></label>
              <Select borderColor="#9CB42F" name="safe" onChange={handleChange} required>
                <option value="" disabled selected>Select Safe for Children and Pets</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
              <Button className="btn-green">Add Plant</Button>
            </Box>
          </form>
        </Box>
      </Container>
    </main>
  )
}

export default PlantsNew