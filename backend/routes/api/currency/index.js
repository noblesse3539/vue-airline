const router=require('express').Router()
const controller=require('./controller')

router.post('/create',controller.createCurrency)
router.get('/search/:nationKor',controller.searchCurrency)

module.exports = router
