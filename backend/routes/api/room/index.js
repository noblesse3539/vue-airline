const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/findChatById/:id', controller.findChatById)
router.get('/findById/:id', controller.findById)
router.post('/create',controller.createRoom)
router.get('/findByGuide/:guide',controller.findRoomByGuide)
router.get('/findByUser/:user',controller.findRoomByUser)
router.get('/findRoomOne/:user/:guide',controller.findRoomOne)
module.exports = router
