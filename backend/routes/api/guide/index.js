const router = require('express').Router()
const controller = require('./controller')

// router.get('/:guideID/:title',controller.findGSByGuideIdTitle)
router.post('/',controller.createGuide)

// router.delete('/:guideID/:title',controller.deleteGuideService)
// router.put('/:guideID/:title',controller.updateGuideService)


module.exports = router
