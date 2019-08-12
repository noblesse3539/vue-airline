const router=require('express').Router()
const controller=require('./controller')
// const checkMiddleware = require('../../../middlewares/auth')
router.get('/findVocByUser/:user',controller.findVocByUser)

// router.use('/create', checkMiddleware)
router.post('/create',controller.createVoc)
router.delete('/delete/:id',controller.deleteVoc)
router.put('/update/:id',controller.updateVoc)

module.exports = router
