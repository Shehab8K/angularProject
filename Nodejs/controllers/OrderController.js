
const ordersModel = require(path.join(__dirname,"../models/Order"));
// const validate = require("../utils/OrdersValidator");

// get all Orders
let getAllOrders = async (req, res) => {
  let data = await ordersModel.find({});
  res.json(data);
};

// get order by id
let getOrderbyid = async (req, res) => {
  let id = req.params.id;
  let order = await ordersModel.findById({_id: id});
  res.json(order);
};

// create new order
let createOrder = async (req, res) => {
  try {
    const data = req.body;
    const gids = data.GID;

    const neworder = new ordersModel({
      date: Date.now(),
      GID: gids,
      userID: data.userID,
      NumGames: gids.length,
      total: data.total,
    });
    await neworder.save();
    await res.status(200).json(neworder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update order(statue or gameslist)
let updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const newData = req.body;
    const order = await ordersModel.findById(orderId);

    if (order.statue === "accepted") {
      return res.status(400).json({ message: "Order has already been accepted and cannot be edited." });
    }

    if (order.statue === "pending") {
      await ordersModel.updateOne(
        { _id: orderId },
        {
          GID: newData.GID,
          statue: newData.statue
        }
      );
      res.send("Order updated successfully");
    } else {
      await ordersModel.updateOne(
        { _id: orderId },
        {
          statue: newData.statue
        }
      );
      res.send("Order status updated successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete order
let deleteOrder = async (req, res) => {
  var ID = req.params.id;

  var order = await ordersModel.findOne({ _id: ID });
  console.log(order.statue);

  
  if (order.statue !='accepted')
  {
    await ordersModel.deleteOne({ _id: ID });
    res.json(order.statue || "Not Found");
  }
  else {
    res.json("this order is already accepted can't be deleted");
  }
};


module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderbyid
};