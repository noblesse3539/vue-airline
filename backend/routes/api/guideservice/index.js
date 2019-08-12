const router = require('express').Router()
const controller = require('./controller')
const authMiddle = require('../../../middlewares/auth')
// const guideCheck = require('../../../middlewares/guideCheck')
const GuideService = require('../../../models/guideservice')

const compareGuideIdwithLoginId = (req, res, next) => {
    const loginId = req.decoded._id
    const guideId = req.body.guide
    if (loginId !== guideId) return res.status(403).json({success: false, msg:'권한이 없습니다.'})
    next()
}

const compareGSGuideIdwithLoginId = (req, res, next) => {
    const loginId = req.decoded._id
    
    const compare = (guideservice) => {
        if(!guideservice.guide.equals(loginId)) return res.status(403).json({success: false, msg:'권한이 없습니다.'})
        next()
    }
    
    GuideService.findById(req.params.id)
    .then(compare)
    .catch( err => {
        console.log(err)
        res.status(400).json({msg:'잘못된 요청입니다.'})
    })
} 

const compareUserwithLoginId = (req, res, next) => {
    const loginId = req.decoded._id

    if (req.params.userId !== loginId) return res.status(403).json({success: false, msg:"권한이 없습니다."})
    next()
}
 
router.get('/findReview/:id',controller.findReview)
router.get('/findOption/:id',controller.findOption)
router.get('/findGSById/:id',controller.findGSById)
router.get('/findGSByGuideIdTitle/:user/:title',controller.findGSByUserObIdTitle)
router.get('/findGSByGuideId/:guide',controller.findGSByGuideObId)


router.get('/findGSAll',controller.findGSAll)
router.get('/search/:keyword',controller.SearchGS)

router.post('/create/', authMiddle, compareGuideIdwithLoginId, controller.createGuideService)
router.delete('/delete/:id', authMiddle, compareGSGuideIdwithLoginId, controller.deleteGuideService)
router.put('/update/:id', authMiddle, compareGSGuideIdwithLoginId, controller.updateGuideService)

router.post('/:guideServiceId/:userId', authMiddle, compareUserwithLoginId, controller.likeGuideService)

// router.delete('/alltags', controller.deleteAllTags)

module.exports = router
