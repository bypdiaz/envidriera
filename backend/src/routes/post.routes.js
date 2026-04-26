const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/authmiddleware");

// crear post (solo usuarios logueados)
router.post("/", authMiddleware, postController.createPost);

// feed público
router.get("/feed", postController.getFeed);

module.exports = router;