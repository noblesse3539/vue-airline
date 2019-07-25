const router=require('express').Router()
const controller=require('./controller')

router.post('/create/:id',controller.createReview)
router.put('/update/:id/:title/:content',controller.updateReview)
router.delete('/delete/:id/:title/:content',controller.deleteReview)


module.exports = router
