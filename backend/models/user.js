const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: String,
    password: String,
    email: String,
    admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function( username, password, email, ) {
    const user = new this({
        username,
        password,
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

// verify the password of the User document
User.methods.verify = function(password) {
    return this.password === password
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)