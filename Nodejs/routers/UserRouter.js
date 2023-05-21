const express = require("express");
const router = express.Router();
const path = require("path");

const userController = require(path.join(__dirname,"../controllers/UserController"));


router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById); 
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 

// Register
router.post('/register', userController.createUser);

// Login 
router.post('/login',userController.login);

module.exports = router;