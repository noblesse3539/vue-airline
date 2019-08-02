const router=require('express').Router()
const controller=require('./controller')

router.post('/create/:id',controller.createReview)
router.put('/update/:id',controller.updateReview)
router.delete('/delete/:id',controller.deleteReview)

module.exports = router
