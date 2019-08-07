const User = require('../../../models/user')
const PaymentStore = require('../../../models/paymentStore')
const nodemailer = require('nodemailer')

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