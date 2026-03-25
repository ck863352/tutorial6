const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://khanhxx151_db_user:aAt6Pb87L5hOQf98@cluster06.apxwg9g.mongodb.net/Tutorial6")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const userSchema = new mongoose.Schema({
  firstName: String,
  email: String
});

const User = mongoose.model("User", userSchema,"User");


// GET
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Users retrieved",
      success: true,
      users: users
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
});

// GET id
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    res.status(200).json({
      user: user,
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
});

// add
app.post("/add", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "name and email are required",
        success: false
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false
      });
    }

    const newUser = await User.create({
      name,
      email
    });

    res.status(201).json({
      message: "User added",
      success: true,
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
});

// update id
app.put("/update/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    res.status(200).json({
      message: "User updated",
      success: true,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    res.status(200).json({
      message: "User deleted",
      success: true,
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
});

module.exports = app;