const { nanoid } = require('nanoid');
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  id: { type: String, default: nanoid(10) },
  username: { type: String, default: nanoid(10) },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String, default: '/uploads/1.jpg' },
});

module.exports = model('User', userSchema);
