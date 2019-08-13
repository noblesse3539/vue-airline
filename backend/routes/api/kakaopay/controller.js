const User = require('../../../models/user')
const PaymentStore = require('../../../models/paymentStore')
const nodemailer = require('nodemailer')
const axios = require('axios')
const kakaosecret = require('../../../kakaosecret')
const qs = require('qs')
const config = require('../../../config')
const from_email = config.gmail.auth.user

exports.sendEmail = (req, res) => {
    const {_id} = req.body
    User.findById(_id)
    .then( user => {
        PaymentStore.findOne({user: user._id}).sort('-created_at')
        .then( async (payment) => {
            const email = user.email
            const transporter = await nodemailer.createTransport(config.gmail)
            const mailOptions = {
                from: from_email,
                to: email,
                subject: '결제가 완료되었습니다.',
                text: JSON.stringify(payment)
            }
    
            transporter.sendMail(mailOptions, (error, info) => {
                if( error ) {
                    console.log(error)
                    res.json({sendEmail: false})
                }
                else {
                    console.log('Email sent: ' + info.response)
                    res.json({sendEmail: true})
                }
            })
        })
        .catch( err => {
            console.log(err)
            res.json({sendEmail: false})
        })
    })
    .catch( err => {
        console.log(err)
        res.json({sendEmail: false})
    })
}


exports.requestPay = (req, res) => {
    console.log(req.body)
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
} 