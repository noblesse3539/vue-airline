const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Guide = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    nation_eng:String,
    nation_kor:String,
    city_eng:[String],
    city_kor:[String],
    language_eng:[String],
    language_kor:[String],
    starRating:Number,
    starRatingList:[{userId:String,starRating:Number}],
    admin: { type: Boolean, default: false }
})

Guide.statics.create = function( user, nation_kor, nation_eng, city_kor, city_eng, language_kor, language_eng, starRating, starRatingList) {
    const guide = new this({
        user,
        nation_kor,
        nation_eng,
        city_kor,
        city_eng,
        language_kor,
        language_eng,
        starRating,
        starRatingList
    })

    // return the Promise
    return guide.save()
}

Guide.statics.deleteByUserObId = function(user){
  return this.findOneAndRemove({
    user
  }).exec()
}

Guide.statics.updateByUserObId = function(user,nation_kor,nation_eng,city_kor,city_eng,language_kor,language_eng){
  return this.findOneAndUpdate({
    user,
    nation_kor,
    nation_eng,
    city_kor,
    city_eng,
    language_kor,
    language_eng
  }).exec()
}

Guide.statics.findByUserObId = function(user){
  return this.findOne({
    user
  }).exec()
}


module.exports = mongoose.model('Guide',Guide)
