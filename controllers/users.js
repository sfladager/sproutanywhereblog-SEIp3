import { findSingleUser } from '../config/helpers.js'
import { sendErrors } from '../config/helpers.js'

export const updateUser = async (req, res) => {
  try {
    const user = await findSingleUser(req, res)
    if (user) {
      Object.assign(user, req.body)
      user.save()
      console.log('User updated!')
      return res.status(202).json(user)
    }
  } catch (err) {
    sendErrors(res, err)
  }
}