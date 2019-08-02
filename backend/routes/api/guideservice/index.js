const router = require('express').Router()
const controller = require('./controller')

router.get('/findReview/:id',controller.findReview)
router.get('/findOption/:id',controller.findOption)
router.get('/findGSById/:id',controller.findGSById)
router.get('/findGSByGuideIdTitle/:user/:title',controller.findGSByUserObIdTitle)
router.get('/findGSByGuideId/:guide',controller.findGSByGuideObId)


router.get('/findGSAll',controller.findGSAll)
router.get('/search/:keyword',controller.SearchGS)

router.post('/create/',controller.createGuideService)
router.delete('/delete/:id',controller.deleteGuideService)
router.put('/update/:id',controller.updateGuideService)

router.post('/:guideServiceId/:userId', controller.likeGuideService)

module.exports = router
