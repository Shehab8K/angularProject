const express = require('express');
const cors = require('cors');
const path = require("path");

const productController = require(path.join(__dirname, "./controllers/ProductController"));
const OrderRouter = require("./routers/OrderRouter");

const app = express();

//enable parsing of json object in the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const connectDB = require('./db.js');
require('dotenv').config({path: __dirname + '/.env'})

// Connect to MongoDB
connectDB(process.env.DATABASE_NAME);

// Middleware to parse request body as JSON
// app.use(express.json());
app.use('/api/products',productController)

app.use('/api/users',UserRouter);
app.use("/api/orders", OrderRouter);

app.use('/api/products',productController);


app.get('/',(req,res)=>{
    res.send("Hello Shehab");
});
// Routes for managing user data
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/api/users/register', userController.createUser);
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
