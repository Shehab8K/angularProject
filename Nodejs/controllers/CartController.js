const User = require("../models/User"); // import the User model
const jwt = require("jsonwebtoken");


const updateUserCart = async (req, res) => {
    console.log("Hello from cart")
    const userId = req.params.id;
    const cart = req.body.cart;
    console.log(userId);
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      // Update the cart for the user
      user.cart = cart;
      const updated =  await user.save();
      if(!updated)
      {
        return res.status(400).json({ message: "Cart not updated" });
      }
      return res.json({ message: "Cart updated successfully" });
    } catch (error) {
      // Handle any errors that occurred
      res.status(500).json({ message: "in catch "+error.message });
      return;
    }
  };
  
module.exports = {
    updateUserCart
}