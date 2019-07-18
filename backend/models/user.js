const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const User = new Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    gender: String,
    languages: [String],
    intro: String,
    UsedGuides: [{ type: Schema.Types.ObjectId, ref: 'guide'}],
    UsedGuideServices: [{ type: Schema.Types.ObjectId, ref: 'guideservice'}]
    // admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function( username, password, email, ) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                        .update(password)
                        .digest('base64')
    const user = new this({
        username,
        password: encrypted,
        email
    })

    // return the Promise
    return user.save()
}

User.statics.findOneByUserName = function(username) {
    return this.findOne({
        username
    }).exec()
}

User.statics.findOneById = function(id) {
    return this.findOne({_id:id}).exec()
}

// verify the password of the User document
User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                        .update(password)
                        .digest('base64')
    return this.password === encrypted
}

// User.methods.assignAdmin = function() {
//     this.admin = true
//     return this.save()
// }

User.methods.deleteUser = function( username ) {
    const user = User.findOneByUserName(username)
    return user.delete()
}

module.exports = mongoose.model('User', User)