const { Schema, model } = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  name: String,
  username: { type: String, unique: false }, // TODO: change this to true
  email: { type: String, unique: false },
  password: String
}, { timestamps: true, versionKey: false })

userSchema.methods.toJSON = function () {
  const user = this.toObject() // this = user
  delete user.password
  delete user.email
  return user
}

// creating token
userSchema.methods.genAuthToken = function () {
  return jwt.sign({ userId: this._id.toString() }, 'token') // this = user
}

// password hasing
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 8)
}

module.exports = model('User', userSchema)
