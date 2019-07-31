const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tmpPaymentStore = new Schema({
    id: {type: String, unique: true},
    service: Schema.Types.Mixed 
})


tmpPaymentStore.statics.findOrCreate = function(condition, callback) {
    const {id, service} = condition
    this.findOneAndUpdate({id: id}, {service: service}, (err, tmpStore) => {
        if (tmpStore) {
            return callback(err, tmpStore)
        } else {
            this.create(condition, (err, tmpStore) => {
                return callback(err, tmpStore)
            })
        } 
    })
}
module.exports = mongoose.model('tmpPaymentStore', tmpPaymentStore)