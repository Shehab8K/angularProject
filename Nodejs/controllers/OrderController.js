
const ordersModel = require("../models/Order");
// const validate = require("../utils/OrdersValidator");

let getAllOrders = async (req, res) => {
  let data = await ordersModel.find({});
  res.json(data);
};
let createOrder = async (req, res) => {
data=req.body;
gids=JSON.parse(req.body.GID);
console.log(gids);
let neworder= new ordersModel({
  date: date.now(),
  GID: data.gids ,
  userID: data.userID,
  NumGames:data.gids.length(),
  total:data.total
  
})
await neworder.save();
await res.status(200).json(neworder);
};

let updateOrder = async (req, res) => {
  let Id = req.params.id; 
//   pids=JSON.parse(req.body.pID);
  data=req.body;
    await ordersModel.updateOne(
      { _id: Id },
      {
         
        statue: data.statue,
      }
    );
    await res.send("updated successfully");
};
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

let getOrderbyid = async (req, res) => {
  let id = req.params.id;
  let order = await ordersModel.findById({_id: id});
  res.json(order);
};

module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderbyid
};