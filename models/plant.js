import mongoose from 'mongoose'
// plant schema

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  mainDescription: { type: String, required: true, maxlength: 500 },
  lightDescription: { type: String, required: true, maxlength: 500 },
  waterDescription: { type: String, required: true, maxlength: 500 },
  tempDescription: { type: String, required: true, maxlength: 500 },
  humidityDescription: { type: String, required: true, maxlength: 500 },
  heightDescription: { type: String, required: true, maxlength: 500 },
  toxicityDescription: { type: String, required: true, maxlength: 500 },
  // for filters
  category: { type: String, required: true }, // houseplant, succulent
  idealLocation: [{ type: String, required: true }], // office, living room, bedroom, bathroom, balcony
  sunlightRequired: { type: String, required: true }, // <1hr, 1-2hr, >2hr
  plantHeight: { type: String, required: true }, // small (<50cm), medium(50-100cm), large(>100cm)
  beginnerFriendly: { type: Boolean, required: true }, // yes(skilled) no(unskilled)
  safeForPetsOrChildren: { type: Boolean, required: true }, // yes no
  owner: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Plant', plantSchema)



