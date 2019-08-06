const express = require('express')
const router = express.Router()
const controller = require('./controller')


router.get('/', controller.cityList)
router.get('/findCities/:nationKor', controller.cityListByNation)
router.post('/setup', controller.createCities)

router.get('/cleanList', controller.cleanList)
module.exports = router
