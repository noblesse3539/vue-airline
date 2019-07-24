const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.list)
// router.post('/assign-admin/:username', controller.assignAdmin)
router.delete('/:username', controller.userDelete)

router.put('/:username', controller.update)

router.get('/mypage', controller.mypage)
module.exports = router