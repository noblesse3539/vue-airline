const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const SuperUser = new Schema({
    username: String,
    password: String,
    email: String,
    admin: {type: Boolean, default: false}
})

SuperUser.statics.create = function( username, password, email) {
    const encrypted = crypto.createHmac('sha1', config.superSecret)
                        .update(password)
                        .digest('base64')
    const superUser = new this({
        username,
        password: encrypted,
        email
    })

    return superUser.save()
}

SuperUser.statics.findOneByUserName = function(username) {
    return this.findOne({
        username
    }).exec()
}

SuperUser.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.superSecret)
                        .update(password)
                        .digest('base64')
    return this.password === encrypted
}

SuperUser.methods.assignAdmin = function() {
    this.admin = !this.admin
    return this.save()
}

SuperUser.methods.deleteUser = function(username) {
    const superUser = SuperUser.findOneByUserName(username)
    return superUser.delete()
}

module.exports = mongoose.model('SuperUser', SuperUser)