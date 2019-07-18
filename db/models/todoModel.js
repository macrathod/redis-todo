const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  text: String,
  completed: Boolean
}, { timestamps: true, versionKey: false })

module.exports = model('Todo', todoSchema)
