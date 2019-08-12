const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Room = new Schema({
  max: {type: Number,required: true,default: 2,min: 2},
  user: { type: Schema.Types.ObjectId, ref: 'User',required: true},
  guide: { type: Schema.Types.ObjectId, ref: 'Guide',required: true},
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
}
);

module.exports = mongoose.model('Room', Room);
