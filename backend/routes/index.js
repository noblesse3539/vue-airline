const express = require('express')
const path = require('path')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '../public', 'index.html'))
  res.render('index', { title: 'Express' })
})

// router.get('/airlineDetail', function(req, res) {
//   res.end("hello")
// })

module.exports = router
