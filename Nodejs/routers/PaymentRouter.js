const express = require("express");
const router = express.Router();
const path = require("path");

const userController = require(path.join(__dirname,"../controllers/PaymentController"));

module.exports = router;
