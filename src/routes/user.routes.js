const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  changPassword,
  getPaginatedUsers,
  getUserByEmail,
  searchUsers,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/search", searchUsers);
router.put("/change-password", changPassword);

router.get("/paginated", getPaginatedUsers);
router.get("/by-email", getUserByEmail);

router.delete("/:id", removeUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
