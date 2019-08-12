const router=require('express').Router()
const controller=require('./controller')

const GuideService = require('../../../models/guideservice')
/**
 * api index에서 option의 모든 요청에 대해 authMiddleware를 거치도록 설정함.
 */

const compareLoginIdWithGSGuideId =(req, res, next) => {
    const gsId = req.params.gs
    const loginId = req.decoded._id
    GuideService.findbyId(gsId)
    .then( gs=> {
        if (!gs.guide.equals(loginId)) return res.status(403).json({success: false, msg:'권한이 없습니다.'})
        next()
    })
    .catch( err => {
        console.log(err)
        res.status(400).json({success:false, msg:'잘못된 요청입니다.'})
    })
}

router.post('/create/:gs',controller.createOption)
router.delete('/delete/:id',controller.deleteOption)
router.put('/update/:id',controller.updateOption)

module.exports = router
