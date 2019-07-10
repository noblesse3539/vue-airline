const express = require('express')
const router = express.Router()

const User = require('../models/user.js')


router.get('/getUser/:name', function (req, res, next) {

    const name = req.params.name
    User.find({ name: name }, function(err, docs){

        if (err) {
            console.log(err)
        }

        res.send(docs)
    })
})

router.get('/:name', function (req, res, next) {

    const usr = new User()
    usr.name = req.params.name
    usr.save( function(err, ) {
        if(err) {
            console.log(err)
        }
    })
    res.send(usr)
})

module.exports = router