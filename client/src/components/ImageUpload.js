import axios from 'axios'

const ImageUpload = ({ formFields, setFormFields }) => {

  const handleChange = async (e) => {
    try {
      console.log(e.target.files[0])
      const formData = new FormData()
      // Appends the file information of the file to be uploaded
      formData.append('file', e.target.files[0])
      // Appends the upload preset information
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      // Sends the file data to the cloudinary serve
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      setFormFields({ ...formFields, thumbnail: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="image-field">
      <label htmlFor="image-input-field">Image <span className="required">*</span></label>
      { formFields.thumbnail ? 
        
        <img src={formFields.thumbnail} alt="uploaded image" />
        :
        <input onChange={handleChange} className="image-input-field" type="file" />
      }
    </div>
  )
}

export default ImageUpload