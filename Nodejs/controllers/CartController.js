const User = require("../models/User"); // import the User model
const jwt = require("jsonwebtoken");
const Joi = require("joi");


const updateUserCart = async (req, res) => {
  const userId = req.params.id;
  const cart = req.body.cart;
  console.log("in controller")

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the cart for the user
    user.cart = cart;

    const { error } = validateUpdate(req.body);

    if (error) {
      return res.status(400).json({ message: "Cart Must be array" });
    }

    const updated = await user.save();
    if (!updated) {
      return res.status(400).json({ message: "Cart not updated" });
    }
    return res.json({ message: "Cart updated successfully" });
  } catch (error) {
    // Handle any errors that occurred
    res.status(500).json({ message: error.message });
    return;
  }
};

const validateUpdate = (data) => {
  const userCartSchema = Joi.object({
    cart: Joi.array().required()
  });
  return userCartSchema.validate(data);
};
module.exports = {
  updateUserCart
}