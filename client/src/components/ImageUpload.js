import axios from 'axios'

const ImageUpload = ({ formFields, setFormFields }) => {

  const handleChange = async (e) => {
    try {
      const formData = new FormData()
      // Appends the file information of the file to be uploaded
      console.log(e.target.files[0])
      formData.append('file', e.target.files[0])
      // Appends the upload preset information
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
      // Sends the file data to the cloudinary serve
      const { data } = await axios.post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      console.log('DATA', data)
      setFormFields({ ...formFields, thumbnail: data.secure_url })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="image-field">
      <label className="image-input-field">Image <span className="required">*</span></label>
      { formFields.thumbnail ? 
        <img src={formFields.thumbnail} alt="uploaded image" />
        :
        <input 
          name="image-input-field"
          className="blog-form-input"
          type="file"
          onChange={handleChange} 
        />
      }
    </div>
  )
}

export default ImageUpload