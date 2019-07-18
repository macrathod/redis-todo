const Router = require('express').Router()
const User = require('../db/models/userModel')
const auth = require('../middleware/auth')

/* @public
 * @func: fetch all users
 * @return: users list
 */
Router.get('/all', async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    res.status(500).send('Server Error', err)
  }
})

/* @public
 * @func: create new user
 * @input: username,name,email and password
 * @return: created user
 */
Router.post('/create', async (req, res) => {
  try {
    const userData = req.body
    const user = new User(userData)
    // hash passowrd
    user.password = await User.hashPassword(user.password)
    // gen auth token
    const token = await user.genAuthToken()

    await user.save()
    res.status(201).json({ user, token })
  } catch (err) {
    // res.status(501).send('Server Error', err)
    console.log(err)
  }
})

/* @private
 * @func: edit user
 * @input: name, password
 * @return: edited user
 */
Router.post('/update', auth, async ({ userId, body }, res) => {
  try {
    // if password then hast it
    body.password && (body.password = await User.hashPassword(body.password))

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { ...body },
      { new: true })

    res.status(200).json({ user: updatedUser })
  } catch (err) {
    res.status(500).send('Server Error', err)
  }
})

module.exports = Router
