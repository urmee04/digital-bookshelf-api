//load environmental variables
require("dotenv").config();

//import database connection
const connectDatabase = require("./db/connection");

//import express
const express = require("express");

//create express app
const app = express();

//middleware to parse JSON
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Digital Bookshelf api" });
});

//define port
const PORT = process.env.PORT || 3001;

//start server only after DB connection
async function startServer() {
  try {
    await connectDatabase(); //wait for DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1); //exit process if startup fails
  }
}

startServer();
