const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  signup,
  login,
  uploadPhoto,
  getAllPosts,
  getPostsCategory,
  postCreate,
  getPostsByCategory,
} = require("../controllers/auth.controller");

router.post("/sign_up", signup);
router.post("/login_user", login);
router.post("/upload_post", upload.single("fileData"), uploadPhoto);
router.post("/post_create", postCreate);
router.get("/get_posts", getAllPosts);
router.get("/get_all_category", getPostsCategory);
router.get("/get_post_category", getPostsByCategory);

module.exports = router;
