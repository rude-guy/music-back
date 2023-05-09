const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const registerRouter = require('./routes/router');
const config = require('./config');
const users = require('./routes/user');
const singer = require('./routes/singer');
const song = require('./routes/song');

const port = process.env.PORT || 9002;

const app = express();

mongoose.connect(config.connectionUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB连接异常: '));
db.once('open', function () {
  console.log('MongoDB 连接成功');
});

app.use(cors());
app.use(cookieParser());

// 解析 application/x-www-form-urlencoded 类型的请求体
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 application/json 类型的请求体
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
  return next();
});

registerRouter(app);
app.use('/api/users', users);
app.use('/api/singer', singer);
app.use('/api/song', song);

app.use(compression());

app.use(express.static('./public'));

app.use(function (err, req, res, next) {
  console.log(err.code);
  // 取消CSRF保护
  if (err.code !== 'EBADCSRFTOKEN') {
    return next();
  }

  // handle CSRF token errors here
  res.status(403);
  res.send('<p>接口已经被我用 CSRF 保护了</p>');
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
