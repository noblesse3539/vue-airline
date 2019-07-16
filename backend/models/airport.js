const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Airport = new Schema({
    name_eng : { type: String, required: true, unique: true },
    name_kor : { type: String, required: true, unique: true },
    nation_eng : { type: String },
    nation_kor : { type: String },
    city_eng : { type: String },
    city_kor : { type: String },
    code : { type: String, required: true, unique: true },
})

Airport.statics.create = function( name_eng, name_kor, nation_eng, nation_kor, city_eng, city_kor, code) {
    const airport = new this({
        name_eng,
        name_kor,
        nation_eng,
        nation_kor,
        city_eng,
        city_kor,
        code
    })

    return airport.save()
}
Airport.statics.findAll = function() {
    return this.find({}).exec()
}
Airport.statics.findOneByAirportName = function(name_eng) {
    return this.findOne({
        name_eng
    }).select('name_eng name_kor nation_eng nation_kor city_eng city_kor code').exec()
}


module.exports = mongoose.model('Airport', Airport)