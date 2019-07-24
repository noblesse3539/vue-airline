const router = require('express').Router()
const controller = require('./controller')

router.get('/list', controller.list)
// router.post('/assign-admin/:username', controller.assignAdmin)
router.delete('/:username', controller.userDelete)

router.put('/:username', controller.update) // username으로 수정할 수 있도록 변경해야해

router.get('/mypage', controller.mypage)

router.post('/:username/usedguideservices/:guideServiceId', controller.addUsedGuideServices)
router.delete('/:username/usedguideservices/:guideServiceId', controller.removeUsedGuideServices)
module.exports = router