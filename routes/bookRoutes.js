//import express, Router, and Book schema
const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

//POST / - Creates a new book using the data in req.body
router.post("/", async (req, res) => {
  try {
    const saveBook = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: saveBook,
      message: "Successfully added a Book",
    });
  } catch (error) {
    let status = 500;
    let errType = "Server Error";
    let message = error.message;

    if (error.name === "VaidationError") {
      status = 400;
      errType = "Validation Error";
    } else if (error.code === 11000) {
      status = 400;
      errType = "Duplicate Error";
      message = "ISBN already exits";
    }
    res.status(status).json({
      success: false,
      error: errType,
      message,
    });
  }
});

//GET / - Retrieves all books from the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
});

//GET /:id - Get a single book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "Invalid book ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
});

//PUT /:id - Updates a book by its _id using the data in req.body
router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation on update
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "Invalid book ID format",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: "Validation Error",
        message: error.message,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Error",
        message: "ISBN already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
});

//DELETE /:id - Deletes a book by its _id
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Not Found",
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: "Book deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid ID",
        message: "Invalid book ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
      message: error.message,
    });
  }
});
//export router
module.exports = router;
