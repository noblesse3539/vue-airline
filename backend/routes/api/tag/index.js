const router=require('express').Router()
const controller=require('./controller')
const authMiddleware = require('../../../middlewares/auth')
const guideCheck = require('../../../middlewares/guideCheck')

router.get('/findGSByTag/:tag',controller.findGSByTag)
router.post('/create/:id', authMiddleware, guideCheck, controller.createTag)
router.delete('/delete/:id/:tag', authMiddleware, guideCheck, controller.deleteTag)
router.put('/update/:id/:tag', authMiddleware, guideCheck, controller.updateTag)
router.get('/', controller.getTagList)


module.exports = router
