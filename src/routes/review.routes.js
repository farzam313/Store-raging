const express = require("express");
const {
  getAllReviews,
  createReview,
  getReviewById,
  deleteReviewById,
  updateReview,
  getUserReviews,
} = require("../controllers/review.controller.js");

const router = express.Router();

// Get all reviews
router.get("/", getAllReviews);

// Create a new review
router.post("/", createReview);
router.put("/", updateReview);
router.delete("/:id", deleteReviewById);
router.get("/:id", getReviewById);
// Example: GET /reviews/date?start=2025-01-01&end=2025-12-31
// Example: GET /reviews/date?start=2025-01-01&end=2025-12-31
router.get("/date", getReviewsByDateRange);

module.exports = router;
