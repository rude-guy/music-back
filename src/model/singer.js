const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const SingerSchema = new Schema({
  __v: { type: Number, select: false },
  id: { type: String, require: true },
  mid: { type: String, require: true },
  name: { type: String, require: true },
  pic: { type: String, require: true },
});

module.exports = model('Singer', SingerSchema);
