const express = require("express");
const router = express.Router();
const orderController = require(path.join(__dirname,"../controllers/OrderController"));


router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderbyid);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);


module.exports = router;