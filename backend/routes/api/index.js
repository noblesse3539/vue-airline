const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const airport = require('./airport')

const guide =require('./guide')
const guideservice =require('./guideservice')

// User
router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)

// Guide
router.use('/createGuide',guide)
router.use('/deleteGuide',guide)
router.use('/updateGuide',guide)
router.use('/findGSByGuideId',guide)


// GuideService
router.use('/createGuideService',guideservice)
// router.use('/deleteGuideService',guideservice)
// router.use('/updateGuideService',guideservice)
// router.use('/findGSByGuideIdTitle',guideservice)

// router.use('/airport', airport)


module.exports = router
