const mongoose = require("mongoose");
const ordersSchema = new mongoose.Schema({

  GID: {
    type: [String],
    required: true,
  },
  statue: {
    type: "string",
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
    required: true,
  },
  userID: {
    type: "number",
    required: true,
  },
  date: {
    type: "Date",
    default: Date.now
    },
  total: {
    type: "number",
    required: true,
  },
  NumGames: {
    type: "number",
    required: true,
  }
});
module.exports = mongoose.model('Order', ordersSchema);