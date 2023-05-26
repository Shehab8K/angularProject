const mongoose = require("mongoose");

// const gameItemSchema = new mongoose.Schema({
//    GameTitle:{
//     type: String,
//     required: true
//    },
// 		GamePic:{
//        type: String,
//       required: true
//     },
//     GamePrice: {
//     type: Number,
//     required: true
//   },
//   tags: {
//     type: [String],
//     required: true
//   },
// });

const ordersSchema = new mongoose.Schema({
  gameItems:{
    type: Array,
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number,
    required: true
  },
  numGames: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', ordersSchema);