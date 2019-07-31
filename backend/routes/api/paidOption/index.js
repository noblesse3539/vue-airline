const router=require('express').Router()
const controller=require('./controller')

router.get('/findPaidOptionByUser/:user',controller.findPaidOptionByUser)
router.get('/findPaidOptionById/:id',controller.findPaidOptionById)
router.post('/create/:option/:user',controller.createPaidOption)
router.delete('/delete/:id/',controller.deletePaidOption)
router.put('/update/:id',controller.updatePaidOption)

module.exports = router
