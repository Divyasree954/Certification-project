const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Define specific roles
    default: "user", // Default role for new users
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Export the model
module.exports = mongoose.model("User", userSchema);

