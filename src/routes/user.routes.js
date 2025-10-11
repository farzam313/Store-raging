const express = require("express");
const {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  changPassword,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:id", getUserById);
router.delete("/:id", removeUser);

router.put("/change-password", changPassword);
router.put("/:id", updateUser);

module.exports = router;
