const express = require("express");
const router = express.Router();
const { createBlog, getBlog } = require("../controllers/createblog");
const upload = require("../multerConfig");

router.post("/createpost", upload.single("image"), createBlog);
router.get('/getpost',getBlog)
module.exports = router;
