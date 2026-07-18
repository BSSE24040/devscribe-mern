const Comment = require("../models/Comment");
const Post = require("../models/Post");

// @desc    Get all comments for a post
// @route   GET /api/comments/:postId
// @access  Public
const getCommentsForPost = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a comment to a post
// @route   POST /api/comments/:postId
// @access  Private
const addComment = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      text,
      post: req.params.postId,
      author: req.user._id,
    });

    const populatedComment = await comment.populate("author", "name avatar");

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment (comment author only)
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCommentsForPost, addComment, deleteComment };
