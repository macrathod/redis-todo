const Router = require('express').Router()
const User = require('../db/models/userModel')

/* @public
 * @func: fetch all users
 * @return: users list
 */
Router.get('/users', async (req, res) => {
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
Router.post('/user', async (req, res) => {
  try {
    const userData = req.body

    const user = new User(userData)
    await user.save()
    res.status(201).json(user)
  } catch (err) {
    res.status(500).send('Server Error', err)
  }
})

/* @private
 * @func: edit user
 * @input: name, password
 * @return: edited user
 */

module.exports = Router
