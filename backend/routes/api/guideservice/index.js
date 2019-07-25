const router = require('express').Router()
const controller = require('./controller')

router.get('/:user/:title',controller.findGSByUserObIdTitle)
router.post('/',controller.createGuideService)

router.delete('/:user/:title',controller.deleteGuideService)
router.put('/:user/:title',controller.updateGuideService)

router.post('/:guideServiceId/:userId', controller.likeGuideService)

module.exports = router
