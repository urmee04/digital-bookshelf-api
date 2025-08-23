//load environmental variables
require("dotenv").config();

//import express
const express = require("express");

//import database connection
const connectDatabase = require("./db/connection");

//create express app
const app = express();

//connect to database
connectDatabase();

//middleware to parse JSON
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Digital Bookshelf api" });
});

//define port
const PORT = process.env.PORT || 3001;

//start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
