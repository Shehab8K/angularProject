const express = require('express');
const cors = require('cors');
const path = require("path");

const productController = require(path.join(__dirname, "./controllers/ProductController"));
// const filterController = require('./controllers/FilterController');

const app = express();

//enable parsing of json object in the body
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
const connectDB = require('./db.js');
require('dotenv').config({path: __dirname + '/.env'})

// Connect to MongoDB
connectDB(process.env.DATABASE_NAME);

// Routes
const OrderRouter = require(path.join(__dirname,"./routers/OrderRouter"));
// Middleware to parse request body as JSON
// app.use(express.json());
// app.use('/api/products/filter',filterController)
// Routes
const UserRouter = require(path.join(__dirname ,"./routers/UserRouter"));
const PaymentRouter = require(path.join(__dirname ,"./routers/PaymentRouter"));

app.use('/api/users',UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/payment", PaymentRouter);
app.use('/api/products',productController);


app.get('/',(req,res)=>{
    res.send("Hello Shehab");
});


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