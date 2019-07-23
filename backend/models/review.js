const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const Review = new Schema({
  guideservice:{ type: Schema.Types.ObjectId, ref: 'GuideService' },
  title:String,
  content: String,
  username: String,
  rating: Number,
})

module.exports = mongoose.model('Review',Review)
