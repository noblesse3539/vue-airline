const express = require('express')
const router = express.Router()

const User = require('../models/user.js')


router.get('/', function (req, res, next) {


    User.find({ name: 'opalcat' }, function(err, docs){

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