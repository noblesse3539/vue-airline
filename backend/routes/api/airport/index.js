const router = require('express').Router()
const controller = require('./controller')


router.post('/register', controller.register)


router.get('/list', controller.listOfAirport)
router.get('/search/:keyword', controller.searchAirport)

module.exports = router