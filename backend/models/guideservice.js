const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const GuideService = new Schema({
  guideID: String,
  title:String,
  nation: String,
  city: [String],
  fromDate:String, // Date??
  todate:String,
  duration:String,
  coreImg:String,
  imgList:[String],
  cost:Number,
  desc:String,
  detail:String,
  numOfGuest:Number,
  reviewList:[{userId:String,starRating:Number,content:String}]
})

GuideService.statics.create = function(guideID,title,nation,city,fromDate,toDate,duration,coreImg,imgList,cost,desc,detail,numOfGuest,reviewList){
  const guideservice = new this({
    guideID,
    title,
    nation,
    city,
    fromDate,
    toDate,
    duration,
    coreImg,
    imgList,
    cost,
    desc,
    detail,
    numOfGuest,
    reviewList
  })
  return guideservice.save()
}

GuideService.statics.updateByTitle = function(guideID,title,title,nation,city,fromDate,toDate,duration,coreImg,imgList,cost,desc,detail,numOfGuest,reviewList){
  return this.findOneAndUpdate({
    guideID,
    title, // findOne을 위한 인자값
    title, // 수정될 값들
    nation,
    city,
    fromDate,
    toDate,
    duration,
    coreImg,
    imgList,
    cost,
    desc,
    detail,
    numOfGuest,
    reviewList
  }).exec()
}

GuideService.statics.deleteByTitle = function(guideID,title){
  return this.findOneAndRemove({
    guideID,title
  }).exec()
}


GuideService.statics.findGSByGuideIdTitle = function(guideID,title) {
    return this.findOne({
        guideID,title
    }).exec()
}

module.exports = mongoose.model('GuideService',GuideService)
