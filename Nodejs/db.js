const mongoose = require('mongoose');

const connectDB = async (dbName) => {
  // const dbUri = process.env.DB_URI || `mongodb://127.0.0.1:27017/${dbName}`;
  const dbUri = process.env.DATA || dbName;
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connected to MongoDB: ${dbUri}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
