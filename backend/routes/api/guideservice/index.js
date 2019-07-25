const router = require('express').Router()
const controller = require('./controller')

router.get('/findReview/:id',controller.findReview)
router.get('/findGSById/:id',controller.findGSById)
router.get('/findGSByGuideIdTitle/:user/:title',controller.findGSByUserObIdTitle)
router.get('/findGSAll',controller.findGSAll)
router.get('/search/:keyword',controller.SearchGS)

router.post('/create/',controller.createGuideService)
router.delete('/delete/:user/:title',controller.deleteGuideService)
router.put('/update/:user/:title',controller.updateGuideService)


module.exports = router
