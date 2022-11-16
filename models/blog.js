import mongoose from 'mongoose'

// ! Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  // category
  // tags
  // Article
  // Owner Reference
  // desciption
  // Thumbnail link
}, {
  timestamps: true,
})

export default mongoose.model('Blog', blogSchema)