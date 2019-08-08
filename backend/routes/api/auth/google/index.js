const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const saveRedirectUrl = (req, res, next) => {
    if (req.query.return) {
        let returnURL = req.query.return
        returnURL = returnURL.split('%26').join('&')
        req.session.oauth2return = returnURL
    }
    next()
}
// router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/user', saveRedirectUrl, passport.authenticate('googleUser', { scope: ['profile', 'email'] }))

router.get('/guide', saveRedirectUrl, passport.authenticate('googleGuide', { scope: ['profile', 'email'] }))

router.get(
    '/callback',
    passport.authenticate('googleUser', { failureRedirect: '/', session: false}),
    (req, res) => {
        const returnUrl = req.session.oauth2return || '/'
        console.log('&&&&&&&&&&&')
        console.log(returnUrl)
        console.log('&&&&&&&&&&&')
        jwt.sign(
            {
                _id: req.user._id,
                id: req.user.id,
                email: req.user.email,
                nickname: req.user.nickname,
                username: req.user.username,
                profileImageUrl: req.user.profileImageUrl,
                isGuide: false
            },
            req.app.get('jwt-secret'),
            {
                expiresIn:'3h',
                issuer: 'Kiev Opalcat',
                subject: 'user'
            }, (err, token) => {
                if(err) {
                    console.log('토큰 생성 실패: ', err)
                    res.redirect('http://localhost:8080')
                }
                res.cookie('BisionToken', token, { maxAge: 3600* 1000 * 3})
                res.redirect(returnUrl)
            }
        )
        // loginSuccessHandler(req, res)
    }
)
router.get(
    '/callback-guide',
    passport.authenticate('googleGuide', { failureRedirect: '/', session: false}),
    (req, res) => {
        const returnUrl = req.session.oauth2return || '/'
        console.log('&&&&&&&&&&&')
        console.log(returnUrl)
        console.log('&&&&&&&&&&&')
        jwt.sign(
            {
                _id: req.user._id,
                id: req.user.id,
                email: req.user.email,
                nickname: req.user.nickname,
                username: req.user.username,
                profileImageUrl: req.user.profileImageUrl,
                isGuide: true
            },
            req.app.get('jwt-secret'),
            {
                expiresIn:'3h',
                issuer: 'Kiev Opalcat',
                subject: 'user'
            }, (err, token) => {
                if(err) {
                    console.log('토큰 생성 실패: ', err)
                    res.redirect('http://localhost:8080')
                }
                res.cookie('BisionToken', token, { maxAge: 3600* 1000 * 3})
                res.redirect(returnUrl)
            }
        )
        // loginSuccessHandler(req, res)
    }
)
module.exports = router