const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const Review = new Schema({
  guideservice:{ type: Schema.Types.ObjectId, ref: 'GuideService' },
  title:String,
  content: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
})

module.exports = mongoose.model('Review',Review)
