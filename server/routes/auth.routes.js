const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  uploadPost,
  getAllPosts,
  getPostsCategory,
} = require("../controllers/auth.controller");

router.post("/sign_up", signup);
router.post("/login_user", login);
router.post("/upload_post", uploadPost);
router.get("/get_posts", getAllPosts);
router.get("/get_all_category", getPostsCategory);

module.exports = router;
