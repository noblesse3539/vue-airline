const express = require('express')
const router = express.Router()
const controller = require('./controller')

// router.get('/findCities/:nationKor', controller.cityListByNation)
// router.post('/setup', controller.createCities)
//
// router.get('/cleanList', controller.cleanList)
router.get('/roomListByUser/:user',controller.roomListByUser)
router.get('/roomListByGuide/:guide',controller.roomListByGuide)
router.post('/room/:id/',controller.createChat);

module.exports = router
