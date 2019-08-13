const express = require('express')
const router = express.Router()
const controller = require('./controller')
const GuideService = require('../../../models/guideservice')

const checkGSIsValid = (req, res, next) => {
    const gsid = req.params.gsid
    GuideService.findById(gsid)
    .then( gs => {
        if (gs.canceled) return res.status(406).json({success: false, msg: '취소된 상품은 결제할 수 없습니다.'})
        next()
    })
}

router.post('/sendemail', controller.sendEmail)
router.post('/:gsid', checkGSIsValid, controller.requestPay)


module.exports = router