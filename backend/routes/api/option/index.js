const router=require('express').Router()
const controller=require('./controller')

router.post('/create/:gs',controller.createOption)
router.delete('/delete/:id',controller.deleteOption)
router.put('/update/:id',controller.updateOption)

module.exports = router
