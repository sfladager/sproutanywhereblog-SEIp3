import axios from 'axios'
import { useAnimationFrame } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '../../../helpers/auth'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Profile = () => {

  const [profileData, setProfileData] = useState(null)
  const [errors, setErrors] = useState(false)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log(data)
        setProfileData(data)
      } catch (err) {
        console.log(err)
        setErrors(true)
      }
    }
    getProfile()
  }, [])


  return (
    <main className="profile-page-wrapper">
      <h1>My profile</h1>
      {profileData ?
        <>
          <div className='profile-main-categories'>
            <div className='profile-categories'>
              <h2 className='profile-title'>username: <span>{profileData.username}</span></h2>
              <h2 className='profile-title'>e-mail: <span>{profileData.email}</span></h2>
            </div>
            <Link to="/edit-email" className='btn-edit'>Edit</Link>
          </div>
          <hr></hr>
          <h2 className='profile-title'>My plants</h2>
          <div className='profile-row'>
            {profileData.createdPlants.length > 0 &&
              profileData.createdPlants.map(plant => {
                return (
                  <div key={plant._id} className='profile-card'>
                    <Link to={`/plants/${plant._id}`}>
                      <div className="buffer">
                        <div className="profile-card-image" style={{ backgroundImage: `url(${plant.imageURL})` }}></div>
                        <h2 className='profile-card-title'>{plant.name}</h2>
                      </div>
                    </Link>
                  </div>
                )
              }
              )
            }
            {profileData.createdPlants.length < 1 &&
              <div className='no-plants-yet'>
                <p><span>You have not posted any plants yet, but you can start now!</span></p>
                <Link to="/plants/new" className='btn-post'>Post a plant!</Link>
              </div>
            }
          </div>
          <hr></hr>
          <h2 className='profile-title'>My blogs</h2>
          <div className='profile-row'>
            {profileData.createdBlogs.length > 0 &&
              profileData.createdBlogs.map(blog => {
                return (
                  <div key={blog._id} className='profile-card'>
                    <Link to={`/blogs/${blog._id}`}>
                      <div className="buffer">
                        <p className='profile-card-title'>{blog.title}</p>
                        <div className="profile-card-image" style={{ backgroundImage: `url(${blog.thumbnail})` }}></div>
                      </div>
                    </Link>
                  </div>
                )
              }
              )
            }
            {profileData.createdBlogs.length < 1 &&
              <div className='no-blogs-yet'>
                <p><span>You have not posted any blogs yet, but you can start now!</span></p>
                <Link to="/blogs/new" className='btn-post'>Post a blog!</Link>
              </div>
            }
          </div>
        </>
        :
        errors ? <h2>Something went wrong! Please try again later!</h2> : <h2>Loading</h2>
      }
    </main >

  )
}

export default Profile