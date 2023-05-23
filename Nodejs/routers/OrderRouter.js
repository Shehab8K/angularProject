const express = require("express");
const router = express.Router();
const path = require("path");

const orderController = require(path.join(__dirname,"../controllers/OrderController"));


// GET all orders
router.get("/", orderController.getAllOrders);

// GET order by id
router.get("/:id", orderController.getOrderbyid);

// GET orders by userID
router.get("/user/:userID", orderController.getOrdersByUserID);

// POST new order
router.post("/", orderController.createOrder);

// PUT update order
router.put("/:id", orderController.updateOrder);

// DELETE order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;