//load environmental variables
require("dotenv").config();

//import mongoose
const mongoose = require("mongoose");

//async function to connect to MongoDB

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connection Established");
  } catch (error) {
    console.error("Connection failed:", error.message);
    //exit process if connection fails
    process.exit(1);
  }
}

//export function
module.exports = connectDatabase;
