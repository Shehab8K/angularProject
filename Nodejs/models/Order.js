const mongoose = require("mongoose");
var DB_URL =process.env.DATABASE_NAME;

mongoose.connect(DB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const ordersSchema = new mongoose.Schema({

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