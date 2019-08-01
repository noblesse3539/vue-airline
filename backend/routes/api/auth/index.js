const router = require('express').Router()
const controller = require('./controller')
const authMiddleware = require('../../../middlewares/auth')
const googleRouter = require('./google')


router.post('/register', controller.register)
// router.post('/login', controller.login)

router.use('/update', authMiddleware)
router.put('/update', controller.update)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

// GOOGLE LOGIN

router.use('/google', googleRouter)

// router.get('/login', (req,res) => {
//     let redirectUrl = req.query.redirectUrl
    
//     if (redirectUrl) {
//         res.cookie('redirectUrl', redirectUrl, {
//             expires: new Date(Date.now() + (60 * 1000 * 3)),
//             httpOnly: true
//         })
//     }
//     res.end()
// })

// router.get('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/')
// })



module.exports = router