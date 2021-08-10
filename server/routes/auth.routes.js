const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");

router.post("/sign_up", signup);
router.post("/login_user", login);

module.exports = router;
