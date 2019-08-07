const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Review = new Schema(
  {
    guideservice:{ type: Schema.Types.ObjectId, ref: 'GuideService' },
    payment : { type: Schema.Types.ObjectId, ref: 'PaymentStore', unique: true },
    title : String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
  }
)

module.exports = mongoose.model('Review',Review)
