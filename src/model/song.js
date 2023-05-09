const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SongSchema = new Schema({
  __v: { type: Number, select: false },
  id: { type: String, require: true },
  mid: { type: String, require: true },
  name: { type: String, require: true },
  pic: { type: String, require: true },
  singer: { type: String, require: true },
  url: { type: String, default: '' },
  duration: { type: Number, require: true },
  album: { type: String, require: true },
});

module.exports = model('Song', SongSchema);
