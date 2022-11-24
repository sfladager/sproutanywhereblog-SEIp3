// import { useState, useEffect } from 'react'
// import { Link, useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { getToken, isOwner } from '../../../helpers/auth'

// // Chakra imports
// import { Container, Box, SimpleGrid, Flex, Spacer, Text, Card, CardBody, Image, Heading, Button, ButtonGroup } from '@chakra-ui/react'
// import { FaAmazon } from 'react-icons/fa'
// import lightIcon from '../../../assets/light-icon.webp'
// import waterIcon from '../../../assets/water-icon.webp'
// import tempIcon from '../../../assets/temp-icon.webp'
// import humidIcon from '../../../assets/humid-icon.webp'
// import timeIcon from '../../../assets/time-icon.webp'
// import petIcon from '../../../assets/pet-icon.webp'


// const PlantsIndex = () => {

//   const [plant, setPlant] = useState(null)
//   const [error, setError] = useState(false)
//   const [reviewField, setReviewField] = useState({
//     text: '',
//   })

//   const { id } = useParams()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const getPlant = async () => {
//       try {
//         // console.log(plant)
//         const { data } = await axios.get(`/api/plants/${id}`)
//         // console.log(data)
//         setPlant(data)
//       } catch (err) {
//         setError(true)
//       }
//     }
//     getPlant()
//   }, [id])

//   // useEffect(() => {
//   //   console.log('plant: ' + plant)
//   // }, [plant])
//   // const { name, thumbnail, mainDescription, lightDescription, waterDescription, tempDescription, humidityDescription, heightDescription, toxicityDescription, reviews, owner } = plant

//   // useEffect(() => {
//   //   setPlant({ ...plant, reviews: reviewField.text })
//   //   console.log(plant)
//   // }, [reviewField])

//   const handleChange = (e) => {
//     const updatedReviewField = {
//       ...reviewField,
//       [e.target.name]: e.target.value,
//     }
//     setReviewField(updatedReviewField)
//     if (error) setError('')
//   }

//   const handleClick = async (e) => {
//     try {
//       console.log(plant)
//       const { data } = await axios.post(`/api/plants/${id}/review`, { ...plant, reviews: reviewField }, {
//       }, [id])

//       // const { name, thumbnail, mainDescription, lightDescription, waterDescription, tempDescription, humidityDescription, heightDescription, toxicityDescription } = plant

//       // useEffect(() => {
//       //   console.log(plant)
//       //   console.log(plant.owner)
//       // }, [plant])

//       const deletePlant = async (e) => {
//         try {
//           await axios.delete(`/api/plants/${id}`, {
//             headers: {
//               Authorization: `Bearer ${getToken()}`,
//             },
//           })
//           console.log('EDIT SUCCESS ->', data)
//         } catch (err) {
//           console.log('EDIT FAIL ->', err)
//           setError(err.response.data)
//         }
//       }
//       navigate('/plants')
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const amazonClick = () => {
//     window.open(
//       `https://www.amazon.co.uk/s?k=${name}`
//     )
//   }
//     <>
//               <input
//                 type="text"
//                 name="text"
//                 onChange={handleChange}
//                 // value={reviewField.text}
//                 placeholder="Review"
//               />
//               <button className="btn-post" onClick={handleClick}>Post review</button>
//             </main >
//     </>
//         )
// }

// export default PlantsIndex
