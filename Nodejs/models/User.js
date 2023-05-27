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
  cart: {
    type: Array,
    default: []
  },
  token: {
    type: String,
  },
  discord: {
    type: String,
    default: "",
  }, 
  bgColor: {
    type: String,
    default: "rgba(112, 192, 219, 0.527)",
  },
  preferences:{
    type: Array,
    default: [],
  },
  isBanned:{
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
