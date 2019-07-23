const router=require('express').Router()
const controller=require('./controller')

router.get('/:tag',controller.findGSByTag)
router.post('/:id',controller.createTag)
router.delete('/:id/:tag',controller.deleteTag)


module.exports = router
