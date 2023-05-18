const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");


router.get("/orders", orderController.getAllOrders);

router.post("/create", orderController.createOrder);
router.put("/order/:id", orderController.updateOrder);
router.delete("/delete/:id", orderController.deleteOrder);
router.get("/:id", orderController.getOrderbyid);


module.exports = router;