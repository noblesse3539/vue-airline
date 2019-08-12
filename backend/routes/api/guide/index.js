const router = require('express').Router()
const controller = require('./controller')
const authMiddle = require('../../../middlewares/auth')

const compareIdWithTokenId = (req, res, next) => {
    const loginId = req.decoded._id
    const guideId = req.params.id
    if (loginId !== guideId) return res.status(403).json({success: false, msg:'권한이 없습니다.'})

    next()
}

router.get('/findByUserObId/:user',controller.findByUserObId)
// router.post('/create/',controller.createGuide) // 구글로 로그인을 할 때 가이드를 생성하므로 필요가 없다.

// router.delete('/delete/:user',controller.deleteByUserObId)
// router.put('/update/:user',controller.updateByUserObId)

router.get('/', controller.getGuideList)
router.get('/:id', controller.getGuide)
router.put('/:id', authMiddle, compareIdWithTokenId, controller.updateGuide)
// router.delete('/:id', authMiddle, compareIdWithTokenId,controller.deleteGuide) // 탈퇴기능은 막았습니다. 아무도 나가지 못해

// router.get('/:id/calendar', controller.calender) // 구현하지 못한 기능
// router.delete('/:id/allguideservice', authMiddle, compareIdWithTokenId, controller.deleteAllGuideService)
module.exports = router

