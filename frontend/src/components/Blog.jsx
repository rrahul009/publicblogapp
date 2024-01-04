import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Blog = () => {
  const [postData, setPostData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blog/getpost");
      if(response)
      setPostData(response.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid container mt={5} ml={2}>
    {Array.isArray(postData) &&
      postData.map((item) => (
        <Grid item xs={12} lg={6} md={6} key={item.id}>
          <div key={item.id}>
            <img src={`http://localhost:8080/uploads/${item.image}`} height="200px" width="400px" alt="Blog Cover" />
            <p>{item.author}</p>
            <p>{item.content}</p>
            <p>{item.title}</p>
          </div>
        </Grid>
      ))}
  </Grid>
  
  
  );
};

export default Blog;
