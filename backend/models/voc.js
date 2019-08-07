const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const VOC = new Schema({
  userOrGuide: Schema.Types.ObjectId,
  isGuide: Boolean,
  subject: String,
  content: String,
  

})

module.exports = mongoose.model('VOC',VOC)
