const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: String, // Assuming you want to store the filename or URL of the associated image
  tags: {
    type: [String],
    default: [], // Default to an empty array
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  editedAt:{
    type:Date,
    default:Date.now,
  }
  // Add other fields as needed
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
