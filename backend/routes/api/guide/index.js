const router = require('express').Router()
const controller = require('./controller')

router.get('/findByUserObId/:user',controller.findByUserObId)
router.post('/create/',controller.createGuide)

// router.delete('/delete/:user',controller.deleteByUserObId)
// router.put('/update/:user',controller.updateByUserObId)

router.get('/', controller.getGuideList)
router.get('/:id', controller.getGuide)
router.put('/:id',controller.updateGuide)
router.delete('/:id',controller.deleteGuide)
module.exports = router
