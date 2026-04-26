const Post = require("../models/Post");
const Business = require("../models/Business");
const { normalizeVideoUrl } = require("../utils/videoNormalizer");

const createPost = async (data, user) => {
  const { businessId, videoUrl, description } = data;

  // 🔐 validar que el negocio es del usuario
  const business = await Business.findOne({
    where: { id: businessId, userId: user.id },
  });

  if (!business) {
    throw new Error("No autorizado para este negocio");
  }

  // 🎥 normalizar URL
  const { embedUrl } = normalizeVideoUrl(videoUrl);

  // 💾 guardar
  const post = await Post.create({
    businessId,
    videoUrl,
    embedUrl,
    description,
  });

  return post;
};

const getFeed = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const posts = await Post.findAll({
    where: { isActive: true },
    include: {
      model: Business,
      as: "business",
      attributes: ["id", "name"],
    },
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return posts;
};

module.exports = {
  createPost,
  getFeed,
};