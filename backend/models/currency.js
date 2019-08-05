const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Currency = new Schema({
    nation: { type: Schema.Types.ObjectId, ref: 'Nation'},
    code:String
})

module.exports = mongoose.model('Currency',Currency)
