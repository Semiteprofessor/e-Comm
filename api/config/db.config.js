require("dotenv").config();

const { default: mongoose } = require("mongoose");

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    console.log("MongoDB connection successful");
  } catch (error) {
    console.log("MongoDB connection failed" + error);
  }
};

module.exports = connectDB;
