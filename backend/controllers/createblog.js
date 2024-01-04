const Blog = require("../models/createBlog"); // Adjust the path accordingly
// Route for creating a blog post
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBlog = await Blog.create({
      title,
      content,
      author,
      image,
    });

    res.status(201).json({
      message: "Blog post created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getBlog = async (req, res) => {
  try {
    const postData = await Blog.find();
    if (!postData) {
      return res.status(404).json({
        message: "Data is not found",
      });
    }
    res.status(200).json({
        message:"successfully get the blog data",
        Data:postData
    })
  } catch (error) {
    console.error(error);
    res.json({
      message: "internal server error",
    });
  }
};
