const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");


router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderbyid);
router.post("/create", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);


module.exports = router;