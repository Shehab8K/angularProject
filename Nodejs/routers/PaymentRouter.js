const express = require("express");
const router = express.Router();
const path = require("path");

const paymentController = require(path.join(__dirname,"../controllers/PaymentController"));

router.post("/charge",paymentController.createPayment);

module.exports = router;
