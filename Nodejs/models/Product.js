const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  type: {
    type: [String],
    required: true,
    enum: ["singleplayer", "multiplayer"],
  },
  tag: {
    type: [String],
    required: true,
    enum: ['action','funny','sports','adventure','horror']
  },
  releasedDate: {
    required: true,
    type: Date,
  },
  os: {
    type: [String],
    enum: ["windows", "mac", "linux"],
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  character: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
