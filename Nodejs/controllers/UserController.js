const User = require("../models/User"); // import the User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


require('dotenv').config({path: __dirname + '/.env'})

// login 
const login = async (req, res) => {
  try{
    const email = req.body.email;
    console.log(req.body);
    const user = await User.findOne().where({name:"Shehab"});
    console.log("Pasword from db : "+user);
    if(user.password != req.body.password)
    {
      console.log("Wrong password");
    }else{
      userDataForToken = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
      const token = jwt.sign(userDataForToken,process.env.SECRET_KEY , { expiresIn: '1d' });
      console.log("Logged in");
      console.log(token);
      res.json(token);
    }
  }catch (err) {
    console.log(err);
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
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = {
      name,
      username,
      email,
      password: hashedPassword,
    };

    const token = jwt.sign(userData,process.env.SECRET_KEY , { expiresIn: '1d' });
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      token: token  // token
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

// update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      const updatedUser = await user.save();
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
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    if (user) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
};
