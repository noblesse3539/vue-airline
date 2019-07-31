const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PaymentStore = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'user'},
    service: Schema.Types.Mixed,
    status: String,
    created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('PaymentStore', PaymentStore)