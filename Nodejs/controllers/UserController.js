const User = require("../models/User"); // import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const mongoose = require('mongoose');

require("dotenv").config({ path: __dirname + "/.env" });

// login
const login = async (req, res) => {
  try{
    const userEmail = req.body.email.toLowerCase();
    const userPassword = req.body.password;

    const user = await User.findOne({email:userEmail});
    // Check if user is available ?
    if(!user)
    {
      res.status(404).json({message: "Email not registered"});
      return;
    }

    const isPasswordValid = await bcrypt.compare(userPassword,user.password);
    // Check if password is valid ?
    if(!isPasswordValid)
    {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }
    
    // User is found and valdated => creating token and send it
      userDataForToken = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role  
      }
      const token = jwt.sign(userDataForToken,process.env.SECRET_KEY , { expiresIn: '1d' });

      res.json(token);
  }catch (err) {
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
    return;
  }
};

// create a new user
const createUser = async (req, res) => {
  try {

    const { name, username, email, password } = req.body;
    let myuser = {
      name,
      username,
      email,
      password
    }
    const {error} = validateUser(myuser);
    if(error)
    {
      return res.status(400).json({ message: error.details });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      // token: token  // token
    });

    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
      return;
    } catch (err) {
      res.status(409).json({ message: "Email Already Registered" });
      return;
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update a user by ID
const updateUser = async (req, res) => {
  try {

    const {error} = validateUpdate(req.body);

    if(error)
    {
      return res.status(400).json({ message: error.details });
    }

    if(req.body.password)
    {
      const saltRounds = 10;
      var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    }

    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.password = hashedPassword || user.password;
      const updatedUser = await user.save();
      
      if(!updatedUser)
      {
      res.status(400).json({ message: "Failed to update" });
      }
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete a user by ID
const deleteUser = async (req, res) => {
  
  if (!mongoose.isValidObjectId(req.body.id)) {
    res.status(400).json({ message: "Invalid user ID" });
    return;
  }

  try {
    const deleteUser = await User.deleteOne({ _id: req.body.id});
    if (deleteUser) {
      res.json({ message: "User deleted" });
      return;

    } else {
      res.status(400).json({ message: "Failed to delete user" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    return;
  }
};


const validateUser = (data) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  });

  return userSchema.validate(data);
};


const validateUpdate = (data) => {
  const userSchema = Joi.object({
    name: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
  });
  return userSchema.validate(data);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
