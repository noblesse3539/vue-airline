const router=require('express').Router()
const controller=require('./controller')

router.post('/create/:id',controller.createReview)
router.put('/update/:id',controller.updateReview)
router.delete('/delete/:id',controller.deleteReview)
router.get('/findReviewByUser/:user',controller.findReviewByUser)

module.exports = router
