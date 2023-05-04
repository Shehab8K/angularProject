const express = require('express');
const userController = require('./controllers/userController');
const app = express();

// Require Database
const connectDB = require('./db.js');
// Require env
require('dotenv').config({path: __dirname + '/.env'})
// Connect to MongoDB
connectDB(process.env.DATABASE_NAME);

// Middleware to parse request body as JSON
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello Shehab");
});
// Routes for managing user data
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: 'error',
    message: error.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
