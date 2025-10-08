const express = require("express");
const {
  getAllReviews,
  createReview,
} = require("../controllers/review.controller.js");

const router = express.Router();

// Get all reviews
router.get("/", getAllReviews);

// Create a new review
router.post("/", createReview);

module.exports = router;

module.exports = router;
