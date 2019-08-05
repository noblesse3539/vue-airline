const router=require('express').Router()
const controller=require('./controller')

router.get('/findVocByUser/:user',controller.findVocByUser)
router.post('/create',controller.createVoc)
router.delete('/delete/:id',controller.deleteVoc)
router.put('/update/:id',controller.updateVoc)

module.exports = router
