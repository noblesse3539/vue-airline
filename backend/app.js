/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const sampleRouter = require('./routes/sample')
const bodyParser = require('body-parser')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
// const port = process.env.PORT || 3000

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()
const db = require('./db.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// set the secret ket variable for jwt
app.set('jwt-secret', config.secret)


// vue router와 연동
app.use(require('connect-history-api-fallback')())



// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

db()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
// app.use('/api/samples', sampleRouter)
app.use('/api', require('./routes/api'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
