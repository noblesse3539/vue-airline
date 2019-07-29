const express = require('express')
const router = express.Router()
const controller = require('./controller')


router.get('/', controller.nationList)
router.get('/search/:keyword', controller.nationSearch)

router.post('/create', controller.createNations)
router.post('/update', controller.updateNations)

module.exports = router