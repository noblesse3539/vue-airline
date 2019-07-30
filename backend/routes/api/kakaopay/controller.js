const User = require('../../../models/user')
const nodemailer = require('nodemailer')

const config = require('../../../config')
const from_email = config.gmail.auth.user

exports.sendEmail = (req, res) => {
    const {_id} = req.body
    User.findById(_id)
    .then( async (user) => {
        const email = user.email
        const transporter = await nodemailer.createTransport(config.gmail)
        const mailOptions = {
            from: from_email,
            to: email,
            subject: '결제가 완료되었습니다.',
            text: '제곧내'
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
}