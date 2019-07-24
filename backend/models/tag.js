const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const Tag = new Schema({
    tag:{type:String, required:true},
    guideservice: { type: Schema.Types.ObjectId, ref: 'GuideService'}
})

// Tag.statics.deleteByUserObId = function(_id){
//   return this.findOneAndRemove({
//     _id
//   }).exec()
// }
//
// Tag.statics.updateByUserObId = function(_id,content){
//   return this.findOneAndUpdate({
//     _id,content
//   }).exec()
// }
//
// Tag.statics.findByUserObId = function(user){
//   return this.findOne({
//     user
//   }).exec()
// }
//
// Tag.statics.findByGS = function(GS){
//   return this.findOne({
//     GS
//   }).exec()
// }

module.exports = mongoose.model('Tag',Tag)
