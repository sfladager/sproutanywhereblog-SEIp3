import axios from 'axios'
import { useEffect } from 'react'

const ImageUpload = ({ formFields, setFormFields }) => {

  const handleChange = async (e) => {
    try {
      console.log(e.target.files[0])
      const formData = new FormData()
      // console.log('new formData created')
      // Appends the file information of the file to be uploaded
      formData.append('file', e.target.files[0])
      // console.log(formData)
      // Appends the upload preset information
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      // console.log('upload preset appended')
      // console.log(formData)
      // Sends the file data to the cloudinary serve
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      console.log(data)
      setFormFields({ ...formFields, thumbnail: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() =>{
  //   console.log(formFields)
  // }, [formFields])

  return (
    <div className="image-field">
      <label className="image-input-field">Image <span className="required">*</span></label>
      { formFields.thumbnail ? 
        <img src={formFields.thumbnail} alt="uploaded image" />
        :
        <input 
          name="image-input-field"
          className="image-input-field" 
          type="file"
          onChange={handleChange} 
        />
      }
    </div>
  )
}

export default ImageUpload