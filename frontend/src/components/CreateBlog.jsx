import { Grid, Paper, TextField, Typography, Button, Input } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("content", value);
      formData.append("image", selectedFile);
  
      // You can replace the URL with your actual backend API endpoint
      const response = await fetch("http://localhost:8080/api/blog/createpost", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        console.log("Blog post created successfully");
        // Optionally, you can redirect to another page or perform additional actions
      } else {
        console.error("Failed to create blog post");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      <Paper elevation={2} sx={{ padding: "20px", width: "800px" }}>
        <Typography variant="h4" textAlign={"center"}>
          Write Your Post
        </Typography>
        <Grid item>
          <TextField
            label="Title"
            margin="normal"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Author"
            margin="normal"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Input
            type="file"
            margin="normal"
            onChange={handleFileChange}
          />
        </Grid>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
          Submit
        </Button>
      </Paper>
    </Grid>
  );
};

export default CreateBlog;
