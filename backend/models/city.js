const mongoose = require('mongoose')
const Schema = mongoose.Schema

const City = new Schema({
    nation : { type: Schema.Types.ObjectId, ref: 'Nation'},
    city_eng: String,
    city_kor: String
})


module.exports = mongoose.model('City', City)