const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('../config')

const GuideService = new Schema({
  // guideId: String, // 차차 생각
  nation: String,
  // city: [],
  // fromDate:Date, // 차차 생각
  // todate:Date
})

GuideService.statics.create = function(nation){
  const guideservice = new this({
    // nation,
    nation
    // city,
    // fromDate,
    // toDate,
  })
  return guideservice.save()
}

GuideService.statics.findOneByNation = function(nation) {
    return this.findOne({
        nation
    }).exec()
}

module.exports = mongoose.model('GuideService',GuideService)
