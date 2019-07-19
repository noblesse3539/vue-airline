const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')
const superUser = require('./superUser')
const superAuth = require('./superAuth')
const airport = require('./airport')

const guide =require('./guide')
const guideservice = require('./guideservice')

// SuperUser
router.use('/superauth', superAuth)
router.use('/superuser', authMiddleware)
router.use('/superuser', superUser)

// User
router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)

// Guide
router.use('/createGuide',guide)
router.use('/deleteGuide',guide)
router.use('/updateGuide',guide)
router.use('/findGuideByUserObId',guide)

// GuideService
router.use('/createGuideService',guideservice)
router.use('/deleteGuideService',guideservice)
router.use('/updateGuideService',guideservice)
router.use('/findGSByGuideIdTitle',guideservice)

router.use('/airport', airport)


module.exports = router
