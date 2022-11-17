import Plant from '../models/plant.js'

// *** index route ***

export const getAllPlants = async (_req, res) => {
  try {
    const plants = await Plant.find()
    console.log(plants)
    return res.json(plants)
  } catch (err) {
    console.log(err)
  }
}

// *** create route ***

export const addPlant = async (req, res) => {
  try {
    const plantToAdd = await Plant.create(req.body)
    console.log(plantToAdd)
    return res.status(201).json(plantToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err.errors)
  }
}

// *** show route ***

export const getSinglePlant = async (req, res) => {
  try {
    const { id } = req.params
    const plant = await Plant.findById(id)
    if (!plant) {
      throw new Error('Plant not found')
    }
    return res.json(plant)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'plant not found' })
  }
}

// *** category route ***

export const getPlantsByCategory = async (req, res) => {
  try {
    const  { category } = req.params
    const plants = await Plant.find({ category })
    return res.json(plants)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'category not found' })
  }
}

// *** update route *** 

export const updatePlant = async (req, res) => {
  try {
    const { id } = req.params
    const plant = await Plant.findById(id)
    if (!plant) {
      throw new Error('Plant not found')
    }
    Object.assign(plant, req.body)
    plant.save()
    return res.status(202).json(plant)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(404).json(err)
  }
}

// *** delete plant *** 

export const deletePlant = async (req, res) => {
  try {
    const { id } = req.params
    const plant = await Plant.findById(id)
    if (!plant) {
      throw new Error('Plant not found')
    }
    await plant.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(404).json(err)
  }
}