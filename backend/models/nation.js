const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Nation = new Schema({
    nation_eng: String,
    nation_kor: String,
    nation_num: Number,
    code3: String,
    code2: String,
    flagImgUrl: String,
})

module.exports = mongoose.model('Nation', Nation)