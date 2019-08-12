const router=require('express').Router()
const controller=require('./controller')
const authMiddleware = require('../../../middlewares/auth')
const PaymentStore = require('../../../models/paymentStore')

const compareUserWithPaymentUser = (req, res, next) => {
    const user = req.decoded._id
    PaymentStore.findById(req.params.payment)
    .then( payment => {
        if (! payment.user.equals(user)) return res.status(403).json({success:false, msg:'당신은 리뷰를 남길 권한이 없습니다. 허튼짓 하지 마십시오.'})
        next()
    })
    .catch( err => {
        console.log(err)
        res.status(204).json({success:false, msg:'결제정보를 찾을 수 없습니다.'})
    })
}



router.post('/create/:id/:payment', authMiddleware, compareUserWithPaymentUser, controller.createReview)
router.put('/update/:id', authMiddleware, controller.updateReview)
router.delete('/delete/:id', authMiddleware, controller.deleteReview)
router.get('/findReviewByUser/:user',controller.findReviewByUser)

module.exports = router
