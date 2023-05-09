const express = require('express');
const router = express.Router();
const Song = require('../model/song');
const { SuccessModel, ErrorModel } = require('../utils/resModel');

// 获取歌曲列表
router.get('/', async (req, res) => {
  const songs = await Song.find();
  res.json(
    new SuccessModel({
      result: songs,
      message: '操作成功',
    })
  );
});

// 更新歌曲信息
router.post('/:id/update', async (req, res) => {
  const { id } = req.params;
  const song = await Song.findOneAndUpdate({ id }, req.body);
  if (!song) {
    res.json(
      new ErrorModel({
        result: {},
        message: '无相关歌曲信息',
      })
    );
  } else {
    res.json(
      new SuccessModel({
        result: song,
        message: '更新数据成功',
      })
    );
  }
});

router.post('/create', async (req, res) => {
  const { id, mid, name, pic, singer, url, duration, album } = req.body;
  if (
    id === '' ||
    mid === '' ||
    name === '' ||
    pic === '' ||
    singer === '' ||
    duration === '' ||
    album === ''
  ) {
    res.json(
      new ErrorModel({
        result: {},
        message: '歌曲信息不能为空',
      })
    );
    return;
  }
  let repeatedSong = await Song.findOne({ id });
  if (repeatedSong) {
    res.status = 409;
    res.json(new ErrorModel({ message: '歌曲已存在' }));
  } else {
    const result = new Song(req.body).save();
    res.json(
      new SuccessModel({
        result,
        message: '创建歌曲成功',
      })
    );
  }
});

router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  const song = await Song.findOneAndRemove({ id });
  if (!song) {
    res.json(
      new ErrorModel({
        result: {},
        message: '无相关歌曲信息',
      })
    );
  } else {
    res.json(
      new SuccessModel({
        result: song,
        message: '删除歌曲成功',
      })
    );
  }
});
module.exports = router;
