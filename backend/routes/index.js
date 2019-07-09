const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/airlineDetail', function(req, res) {
  res.end("hello")
})

module.exports = router
