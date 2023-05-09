const express = require('express');
const router = express.Router();
const Song = require('../model/song');
const Singer = require('../model/singer');
const { SuccessModel, ErrorModel } = require('../utils/resModel');

// 获取歌手列表
router.get('/', async (req, res) => {
  const users = await Singer.find();
  res.json(
    new SuccessModel({
      result: users,
      message: '操作成功',
    })
  );
});

// 获取歌手歌曲列表
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  // TOOD: 歌手歌曲列表
  const songs = await Song.find({ singer: id });
  res.json(
    new SuccessModel({
      result: songs,
      message: '操作成功',
    })
  );
});

// 更新歌手信息
router.post('/:id/update', async (req, res) => {
  const { id } = req.params;
  const singer = await Singer.findOneAndUpdate({ id }, req.body);
  if (!singer) {
    res.json(
      new ErrorModel({
        result: {},
        message: '无相关用户信息',
      })
    );
  } else {
    res.json(
      new SuccessModel({
        result: singer,
        message: '更新数据成功',
      })
    );
  }
});

router.post('/create', async (req, res) => {
  const { id, mid, name, pic } = req.body;
  if (id === '' || mid === '' || name === '' || pic === '') {
    res.json(
      new ErrorModel({
        result: {},
        message: '歌手信息不能为空',
      })
    );
    return;
  }
  let repeatedSinger = await Singer.findOne({ id });
  if (repeatedSinger) {
    res.status = 409;
    res.json(new ErrorModel({ message: '歌手已存在' }));
  } else {
    const result = new Singer(req.body).save();
    res.json(
      new SuccessModel({
        result,
        message: '创建歌手成功',
      })
    );
  }
});

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const singer = await Singer.findOneAndRemove({ id });
  if (!singer) {
    res.json(
      new ErrorModel({
        result: {},
        message: '无相关歌手信息',
      })
    );
  } else {
    res.json(
      new SuccessModel({
        result: singer,
        message: '删除歌手成功',
      })
    );
  }
});
module.exports = router;
