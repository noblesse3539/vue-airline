const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const GuideService = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  title:String,
  mainImg:String,
  nation_kor: String,
  nation_eng: String,
  city_kor: [String],
  city_eng: [String],
  fromDate:String,
  todate:String,
  duration:String,
  cost:Number,
  minTrav:Number,
  maxTrav:Number,
  totalTrav:Number, // 추가 됨.
  desc:String,
  detail:String,
  reviews:[{userId:String,starRating:Number,content:String}],
  tags:[String] // 추가됨.
})

GuideService.statics.updateByTitle = function(guide,title,title,mainImg,nation,city,fromDate,toDate,duration,cost,minTrav,maxTrav,desc,detail,reviewList){
  return this.findOneAndUpdate({
    guide,
    title, // findOne을 위한 인자값
    title, // 수정될 값들
    mainImg,
    nation_kor,
    nation_eng,
    city_kor,
    city_eng,
    fromDate,
    toDate,
    duration,
    cost,
    minTrav,
    maxTrav,
    totalTrav,
    desc,
    detail,
    reviews,
    tags
  }).exec()
}

GuideService.statics.deleteByTitle = function(guide,title){
  return this.findOneAndRemove({
    guide,title
  }).exec()
}


GuideService.statics.findGSByUserObIdTitle = function(guide,title) {
    return this.findOne({
      guide,title
    }).exec()
}

module.exports = mongoose.model('GuideService',GuideService)
