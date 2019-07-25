const router = require('express').Router()
const controller = require('./controller')

router.get('/findByUserObId/:user',controller.findByUserObId)
router.post('/create/',controller.createGuide)

router.delete('/delete/:user',controller.deleteByUserObId)
router.put('/update/:user',controller.updateByUserObId)

module.exports = router
