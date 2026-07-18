const express = require("express");
const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  toggleLike,
} = require("../controllers/postController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Specific routes must come before "/:id" so Express doesn't treat
// "me" or "mine" as an ObjectId
router.get("/me/mine", protect, getMyPosts);

router.route("/")
  .get(getPosts)
  .post(protect, upload.single("coverImage"), createPost);

router.route("/:id")
  .get(getPostById)
  .put(protect, upload.single("coverImage"), updatePost)
  .delete(protect, deletePost);

router.put("/:id/like", protect, toggleLike);

module.exports = router;
