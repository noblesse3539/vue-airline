const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Option = require('./option')

const PaymentStore = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'user'},
    guide: {type: Schema.Types.ObjectId, ref: 'guide'},
    paymentRef: {type: Schema.Types.ObjectId, ref: 'PaymentStore'},
    service: Schema.Types.Mixed,
    status: String, // 결제, 결제취소
    created_at: {type: Date, default: Date.now}
})

PaymentStore.methods.getGS = async function () {
    const optionId = this.service.options[0]
    const option = await Option.findById(optionId)
    if(option) return option.guideservice
    return null
}
module.exports = mongoose.model('PaymentStore', PaymentStore)