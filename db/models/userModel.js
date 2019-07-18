const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
}, { timestamps: true, versionKey: false })

module.exports = model('User', userSchema)
