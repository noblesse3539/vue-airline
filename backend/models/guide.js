const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const Guide = new Schema({
    guideID: String,
    guidePW: String,
    email: String,
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

Guide.statics.create = function( guideID, guidePW, email, nation_kor, nation_eng, city_kor, city_eng, language_kor, language_eng, starRating, starRatingList) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                        .update(guidePW)
                        .digest('base64')
    const guide = new this({
        guideID,
        guidePW: encrypted,
        email,
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


module.exports = mongoose.model('Guide',Guide)
