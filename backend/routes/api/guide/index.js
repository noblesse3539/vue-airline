const router = require('express').Router()
const controller = require('./controller')

router.get('/', controller.guideList)
router.post('/',controller.createGuide)

router.get('/:user',controller.findByUserObId)

router.delete('/:user',controller.deleteByUserObId)
router.put('/:user',controller.updateByUserObId)

module.exports = router
