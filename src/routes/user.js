const express = require('express');
const router = express.Router();
const User = require('../model/users');
const { SuccessModel, ErrorModel } = require('../utils/resModel');

// 校验邮箱
const validateEmail = (email) => {
  const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(email);
};

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(
    new SuccessModel({
      result: users,
      message: '操作成功',
    })
  );
});
// 注册
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  if (!validateEmail(email) || username === '' || password === '') {
    res.json(
      new ErrorModel({
        result: {},
        message: '邮箱或用户名不能为空',
      })
    );
    return;
  }
  let repeatedUser = await User.findOne({ email, username });
  if (repeatedUser) {
    res.status = 409;
    res.json(new ErrorModel({ message: '用户已存在' }));
  } else {
    const result = new User(req.body).save();
    res.json(
      new SuccessModel({
        result,
        message: '注册成功',
      })
    );
  }
});
// 登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (username === '' || password === '') {
    res.json(
      new ErrorModel({
        result: {},
        message: '邮箱或密码不能为空',
      })
    );
    return;
  }
  const user = await User.findOne({ username, password });
  if (!user) {
    res.json(
      new ErrorModel({
        result: {},
        message: '邮箱或密码错误',
      })
    );
  } else {
    res.json(
      new SuccessModel({
        result: { user },
        message: '登录成功',
      })
    );
  }
});
module.exports = router;
