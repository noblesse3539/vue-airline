const express = require('express')
const router = express.Router()
const axios = require('axios')
const kakaosecret = require('../../../kakaosecret')
const qs = require('qs')
const kakaoPush = require('../../../utils/kakao/push')
const controller = require('./controller')
router.post('/', (req, res) => {
    const data = {
        'approval_url'      : kakaosecret.approval_url,
        'cancel_url'        : kakaosecret.cancel_url,
        'fail_url'          : kakaosecret.fail_url,
        'cid'               : kakaosecret.cid,
        'partner_order_id'  : kakaosecret.partner_order_id,
        'partner_user_id'   : kakaosecret.partner_user_id,
        ...req.body
    }
 
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':'KakaoAK '+ kakaosecret.kakao_admin,
        },
    }
    axios.post('https://kapi.kakao.com/v1/payment/ready', qs.stringify(data), config)
    .then( myres => {
        res.json(myres.data)
    })
    .catch( err => {
        console.log(err.response.data.msg)
        console.log(err.response)
        res.json({error: '잘못된 요청입니다.'})
    })
} )

router.post('/sendemail', controller.sendEmail)





module.exports = router