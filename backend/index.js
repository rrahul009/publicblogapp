const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/user");
const createBlogRoute = require("./Routes/createblog");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Update with your frontend URL
    credentials: true,
  })
);

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/blog", createBlogRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on the http://localhost${process.env.PORT}`);
});
