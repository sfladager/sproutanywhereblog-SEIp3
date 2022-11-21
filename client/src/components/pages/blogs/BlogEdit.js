import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BlogEdit = () => {

  // ! Location Variables
  const { blogsId } = useParams()

  // ! State
  const [ formFields, setFormFields ] = useState({
    
  })

  // ! Execution
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.put(`/api/blogs/${blogsId}`)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [blogsId])


  return (
    <h1>EDIT BLOG PAGE</h1>
  )
}

export default BlogEdit