const router=require('express').Router()
const controller=require('./controller')

router.post('/:id',controller.createReview)

router.delete('/:id/:title/:content',controller.deleteReview)


module.exports = router
