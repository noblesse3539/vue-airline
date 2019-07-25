const router=require('express').Router()
const controller=require('./controller')

router.get('/findGSByTag/:tag',controller.findGSByTag)
router.post('/create/:id',controller.createTag)
router.delete('/delete/:id/:tag',controller.deleteTag)
router.put('/update/:id/:tag',controller.updateTag)

module.exports = router
