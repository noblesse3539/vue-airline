const router = require('express').Router()
const controller = require('./controller')

router.get('/:user',controller.findByUserObId)
router.post('/',controller.createGuide)

router.delete('/:user',controller.deleteByUserObId)
router.put('/:user',controller.updateByUserObId)

module.exports = router
