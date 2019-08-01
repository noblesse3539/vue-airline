const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

// router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/user', passport.authenticate('googleUser', { scope: ['profile', 'email'] }))

router.get('/guide', passport.authenticate('googleGuide', { scope: ['profile', 'email'] }))

router.get(
    '/callback',
    passport.authenticate('googleUser', { failureRedirect: '/', session: false}),
    (req, res) => {
        
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
                res.redirect('http://localhost:8080?token='+token)
            }
        )
        // loginSuccessHandler(req, res)
    }
)
router.get(
    '/callback-guide',
    passport.authenticate('googleGuide', { failureRedirect: '/', session: false}),
    (req, res) => {
        
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
                res.redirect('http://localhost:8080?token='+token)
            }
        )
        // loginSuccessHandler(req, res)
    }
)
module.exports = router