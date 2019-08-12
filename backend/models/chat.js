const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema({
  room: {type: Schema.Types.ObjectId, ref: 'Room', required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  guide: {type: Schema.Types.ObjectId, ref: 'Guide'},
  chat: String,
  gif: String,
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Chat', Chat);
