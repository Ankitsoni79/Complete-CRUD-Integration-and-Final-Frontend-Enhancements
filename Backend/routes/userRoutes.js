const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST
router.post("/", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json({ message: "User added successfully" });
});

// PUT
router.put("/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "User updated successfully" });
});

// DELETE
router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
