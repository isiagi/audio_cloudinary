const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Database connection error", error);
  }

  const db = mongoose.connect;

  return db;
};

module.exports = dbConnection;
