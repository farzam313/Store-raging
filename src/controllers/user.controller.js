const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ error: "Email, name, and password are required" });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error details:", error);
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: error.message });
  }
};
const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    console.log("some error happening:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    console.log("an update request received-------------->:", req);
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User id is required" });
    }

    // Build the data object dynamically
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;

    // If nothing to update
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ error: "No valid fields provided to update" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(500).json({ error: error.message });
  }
};
const changPassword = async (req, res) => {
  try {
    if (!req.body.id || !req.body.oldPassword || !req.body.newPassword) {
      return res
        .status(400)
        .json({ error: "id, oldPassword and newPassword are required" });
    }

    if (req.body.newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "New password must be at least 6 characters long " });
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.body.id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not Found !" });
    }
    if (user.password !== req.body.oldPassword) {
      return res.status(400).json({ error: "Incorrect old password" });
    }
    const newPassword = req.body.newPassword;
    await prisma.user.update({
      where: { id: parseInt(req.body.id) },
      data: { password: newPassword },
    });
    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error("Error in changing password:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  removeUser,
  updateUser,
  changPassword,
};
