const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
} = require("../controllers/user.controller.js");

const router = express.Router();

// Route: GET /users - Get all users
router.get("/", getAllUsers);

// Route: POST /users - Create a new user
router.post("/", createUser);

// Route: GET /users/:id - Get user by ID
router.get("/:id", getUserById);

// Route: DELETE /users/:id - Delete user by ID
router.delete("/:id", removeUser);

module.exports = router;
