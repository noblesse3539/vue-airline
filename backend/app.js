/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const passport = require('passport')
const session =require('express-session')
const cors = require('cors')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const sampleRouter = require('./routes/sample')
const bodyParser = require('body-parser')
const fs = require('fs')
const rfs = require("rotating-file-stream")
const winston = require("winston"),
    expressWinston = require('express-winston')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
// const port = process.env.PORT || 3000

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()


app.use(cors())


const db = require('./db.js')

// logging
// app.use(expressWinston.logger({
//   transports: [
//       new winston.transports.Console(),
//       new winston.transports.File({ filename: 'app.log' })
//   ],
//   format: winston.format.combine(
//       winston.format.colorize(),
//       winston.format.json()
//   ),
//   meta: true,
//   msg: "HTTP {{req.method}} {{req.url}} {{req.headers['x-forwarded-for'] || req.connection.remoteAddress}} Welcome!",
// }))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// set the secret ket variable for jwt
app.set('jwt-secret', config.secret)


/* =======================
    PASSPORT CONFIGURATION
==========================*/
app.use( session({
  secret: config.GoogleOAuth2Credentials.client_secret,
  resave: false,
  saveUninitialized: true,
  cookie : { secure : false, maxAge : (4 * 60 * 60 * 1000) },
}))
require('./utils/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())


// vue router와 연동
// app.use(require('connect-history-api-fallback')())

app.use(function (req, res, next) {
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);
// Pass to next layer of middleware
next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

db()

/* =======================
    LOGGING CONFIG
==========================*/
const logfileName = () => {
  const D = new Date()
  let m = (D.getMonth() + 1).toString()
  let d = D.getDate().toString()
  return `${D.getFullYear()}-${m.length === 1? "0"+m: m}-${d.length === 1? "0"+d: d}.log`
}

const accessLogStream = rfs(logfileName(), {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStream }))
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

/* =======================
SOCKET.IO CONFIGURATION
==========================*/
const SocketIO = require('./socket')

const server = app.listen(3000, function() {
  console.log('server running on port 3000');
});

SocketIO(server,app)

module.exports = app
