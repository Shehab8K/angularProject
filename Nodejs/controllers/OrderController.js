const path = require("path");
const Order = require(path.join(__dirname, "../models/Order"));

// get all Orders
let getAllOrders = async (req, res) => {
  let data = await Order.find({});
  res.json(data);
};

// get order by id
let getOrderbyid = async (req, res) => {
  try {
    let id = req.params.id;
    let order = await Order.findById(id);
    res.json(order);
  }
  catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// get all orders by userID
let getOrdersByUserID = async (req, res) => {
  try {
    const userID = req.params.userID;
    const orders = await Order.find({ userID });
    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

let createOrder = async (req, res) => {
  try {
    const data = req.body;
    const gameItems = data.gameItems;

    let total = 0;
    for (let i = 0; i < gameItems.length; i++) {
      total += gameItems[i].price;
    }

    const newOrder = new Order({
      gameItems: gameItems,
      status: 'pending',
      userID: data.userID,
      date: Date.now(),
      numGames: gameItems.length,
      total: total,
    });

    await newOrder.save();
    await res.status(200).json(newOrder);
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// update order(status)
let updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newData = req.body;
    const order = await Order.findById(orderId);

    if (order.status === "accepted") {
      return res.status(400).json({ message: "Order has already been accepted and cannot be edited." });
    }

    if (order.status === "pending") {
      await Order.updateOne(
        { _id: orderId },
        {
          status: newData.status
        }
      );
      res.send("Order updated successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete order
let deleteOrder = async (req, res) => {
  console.log("in controller")
  try {
    var ID = req.params.id;
    console.log("in controller")
    var order = await Order.findOne({ _id: ID });
    console.log(order.status);

    if (order.status === 'accepted') {
      res.json("This order has already been accepted and cannot be deleted.");
    } else {
      await Order.deleteOne({ _id: ID });
      res.json(order.status || "Not Found");
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUserID,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderbyid
};