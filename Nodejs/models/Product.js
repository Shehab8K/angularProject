const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    // required: true,
    min: 1,
  },
  type: {
    type: [String],
    enum: ["singleplayer", "multiplayer"],
  },
  tag: {
    type: [String],
    enum: ['action','funny','sports','adventure','horror']
  },
  releasedDate: {
    type: Date,
  },
  os: {
    type: [String],
    enum: ["windows", "mac", "linux"],
  },
  description: {
    type: String,
  },
  images: {
    type: [String],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
