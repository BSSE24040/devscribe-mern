const express = require("express");
const {
  getCommentsForPost,
  addComment,
  deleteComment,
} = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/:postId")
  .get(getCommentsForPost)
  .post(protect, addComment);

router.delete("/:id", protect, deleteComment);

module.exports = router;
