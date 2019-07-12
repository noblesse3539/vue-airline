const router = require('express').Router()
const controller = require('./controller')

router.post('/',controller.createGuideService)

module.exports = router
