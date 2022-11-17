import mongoose from 'mongoose'

// ! Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, requied: true },
  article: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})

export default mongoose.model('Blog', blogSchema)