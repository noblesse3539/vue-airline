const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const VOC = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  subject: String,
  content: String
})

module.exports = mongoose.model('VOC',VOC)
