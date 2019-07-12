const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const guideservice =require('./guideservice')

router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/createGuideService',guideservice)

module.exports = router
