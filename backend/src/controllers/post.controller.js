const postService = require("../services/post.service");

const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body, req.user);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFeed = async (req, res) => {
  try {
    const { page, limit } = req.query;

    console.log("BODY:", req.body);

    const posts = await postService.getFeed(
      parseInt(page) || 1,
      parseInt(limit) || 10

      
    );

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getFeed,
};