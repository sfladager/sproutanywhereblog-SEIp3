import mongoose from 'mongoose'
// plant schema

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  mainDescription: { type: String, required: true, maxlength: 500 },
  lightDescription: { type: String, required: true, maxlength: 500 },
  waterDescription: { type: String, required: true, maxlength: 500 },
  tempDescription: { type: String, required: true, maxlength: 500 },
  humidityDescription: { type: String, required: true, maxlength: 500 },
  heightDescription: { type: String, required: true, maxlength: 500 },
  toxicityDescription: { type: String, required: true, maxlength: 500 },
  // for filters
  category: { type: String, required: true }, // houseplant, succulent
  idealLocation: [{ type: String, required: true }], // office, living room, bedroom, bathroom, patio, garden
  sunlightRequired: { type: String, required: true }, // <1hr, 1-2hr, >2hr
  plantHeight: { type: String, required: true }, // small (<50cm), medium(50-100cm), large(>100cm)
  plantSkill: { type: Boolean, required: true }, // yes(skilled) no(unskilled)
  toxicToPetsOrChildren: { type: Boolean, required: true }, // yes no
  // owner: { type: mongoose.Schema.OnjectId, ref: 'User', required: true }
})

export default mongoose.model('Plant', plantSchema)