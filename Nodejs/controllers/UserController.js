const User = require("../models/User"); // import the User model
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config({ path: __dirname + "/.env" });

// login
const login = async (req, res) => {
  try{
    const userEmail = req.body.email.toLowerCase();
    console.log(userEmail);
    const userPassword = req.body.password;

    const user = await User.findOne({email:userEmail});
    // Check if user is available ?
    if(!user)
    {
      console.log("User Check False");
      res.status(404).json({message: "Email not registered"});
      return;
    }

    const isPasswordValid = await bcrypt.compare(userPassword,user.password);
     console.log("bcrypt testttttt");
    // Check if password is valid ?
    if(!isPasswordValid)
    {
      console.log("Password Check " + isPasswordValid);
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
  }
};

// create a new user
const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    // userData = {
    //   id: newUser.id,
    //   name: newUser.name,
    //   username: newUser.username,
    //   email: newUser.email,
    //   role: newUser.role
    // }
    // const token = jwt.sign(newUser,process.env.SECRET_KEY , { expiresIn: '1d' });
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
  login,
};
