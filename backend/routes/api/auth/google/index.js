const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')

const setIsGuide = (req, res, next) => {
    console.log('setIsGuide 들어와쪄염')
    req.isGuide = true
    next()
}
// router.get('/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/user', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.use('/guide', setIsGuide)
router.get('/guide', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
    '/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        
        jwt.sign(
            {
                _id: req.user._id,
                id: req.user.id,
                email: req.user.email,
                nickname: req.user.nickname,
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

module.exports = router