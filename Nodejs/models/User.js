const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  cart:{
    type: Array,
    default: []
  },
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cart:{
    type:[Object]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
