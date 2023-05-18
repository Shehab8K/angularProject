const mongoose = require("mongoose");
var DB_URL = "mongodb+srv://nada:nada123@gamers-iti.tik9vwa.mongodb.net/gamers";

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const ordersSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  GID: {
    type: "array",
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