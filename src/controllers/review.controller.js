const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllReviews = async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(reviews);
  } catch (err) {
    console.error("Error getting reviews:", err);
    res.status(500).json({ error: err.message });
  }
};
const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.body.id;
    const review = await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const createReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    // Basic validation
    if (!userId || !rating || !comment) {
      return res.status(400).json({
        error: "User ID, rating, and comment are required",
      });
    }

    // Validate rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        error: "Rating must be between 1 and 5",
      });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err);
    if (err.code === "P2003") {
      return res.status(400).json({
        error: "User not found",
      });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id, rating, comment } = req.body;
    if (!id) {
      return res.status(400).json({ error: "Review ID is required" });
    }
    const updatedData = {};
    if (rating) {
      if (rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ error: "Rating must be between 1 and 5" });
      }
      updatedData.rating = rating;
    }
    if (!comment) {
      updatedData.comment = comment;
    }
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: updataedData,
      include: {
        user: { select: { name: true, email: true } },
      },
    });
    res.json(review);
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: err.message });
  }
};
const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const reviews = await prisma.review.findMany({
      where: { userId: parseInt(userId) },
      include: { user: { select: { name: true, email: true } } },
    });
    res.json(reviews);
  } catch (err) {
    console.error("Error in fetching user Reviews:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllReviews,
  createReview,
  getReviewById,
  deleteReviewById,
  updateReview,
  getUserReviews,
};
