const router=require('express').Router()
const controller=require('./controller')
const authMiddleware = require('../../../middlewares/auth')
const guideCheck = require('../../../middlewares/guideCheck')
const GuideService = require('../../../models/guideservice')

const guideServiceAccessCheck = (req, res, next) => {
    const guideId = req.decoded._id
    GuideService.findById(req.params.id)
    .then( gs => {
        if (!gs.guide.equals(guideId)) return res.status(403).json({success: false, msg:'수정할 권리가 없습니다.'})
        next()
    })
    .catch( err=> {
        console.log(err)
        res.status(204).json({success: false})
    })
}

router.get('/findGSByTag/:tag',controller.findGSByTag)
router.post('/create/:id', authMiddleware, guideCheck, controller.createTag)
router.delete('/delete/:id/:tag', authMiddleware, guideCheck, guideServiceAccessCheck, controller.deleteTag)
router.put('/update/:id/:tag', authMiddleware, guideCheck, guideServiceAccessCheck, controller.updateTag)
router.get('/', controller.getTagList)


module.exports = router
