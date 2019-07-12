const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const airport = require('./airport')


const guideservice =require('./guideservice')
backend/routes/api/index.js

router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)
router.use('/createGuideService',guideservice)
router.use('/airport', airport)


module.exports = router

