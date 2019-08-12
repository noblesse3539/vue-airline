const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Option = require('./option')

const PaymentStore = new Schema(
{
    user : {type: Schema.Types.ObjectId, ref: 'User'},
    guide: {type: Schema.Types.ObjectId, ref: 'Guide'},
    paymentRef: {type: Schema.Types.ObjectId, ref: 'PaymentStore'},
    service: Schema.Types.Mixed,
    status: String, // 결제, 결제취소
    // created_at: {type: Date, default: Date.now}
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
})

PaymentStore.methods.getGSId = async function () {
    const optionId = this.service.options[0]
    const option = await Option.findById(optionId)
    if(option) return  await option.guideservice
    return null
}
PaymentStore.methods.getOption = async function () {
    const optionId = this.service.options[0]
    const option = await Option.findById(optionId)
    if(option) return option
    return null
}
module.exports = mongoose.model('PaymentStore', PaymentStore)