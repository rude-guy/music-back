const express = require('express')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const cors = require('cors')
// const csrf = require('xsrf')
const registerRouter = require('./router')

const port = process.env.PORT || 9002

const app = express()

// const csrfProtection = csrf({
//   cookie: false,
//   ignoreMethods: ['HEAD', 'OPTIONS'],
//   checkPathReg: /^\/api/
// })
app.use(cors());
app.use(cookieParser())
// app.use(csrfProtection)

app.get('/', function (req, res, next) {
  // res.cookie('XSRF-TOKEN', req.csrfToken())
  return next()
})

registerRouter(app)

app.use(compression())

app.use(express.static('./dist'))

app.use(function (err, req, res, next) {
  console.log(err.code)
  // 取消CSRF保护
  if (err.code !== 'EBADCSRFTOKEN') {
    return next()
  }

  // handle CSRF token errors here
  res.status(403)
  res.send('<p>接口已经被我用 CSRF 保护了</p>')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
