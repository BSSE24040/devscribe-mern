const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { uploadImage, deleteImage } = require("../services/cloudinaryService");

// @desc    Get all posts (supports ?tag= and ?search= query filters)
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const { tag, search } = req.query;
    const filter = {};

    if (tag) filter.tags = tag;
    if (search) filter.title = { $regex: search, $options: "i" };

    const posts = await Post.find(filter)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name avatar bio");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let coverImage = { url: "", publicId: "" };
    if (req.file) {
      const { url, publicId } = await uploadImage(req.file.buffer, "devscribe/posts");
      coverImage = { url, publicId };
    }

    // Tags arrive as a comma-separated string from the form, e.g. "react,mongodb"
    const parsedTags = tags
      ? tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
      : [];

    const post = await Post.create({
      title,
      content,
      tags: parsedTags,
      coverImage,
      author: req.user._id,
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing post (author only)
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    const { title, content, tags } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    if (tags !== undefined) {
      post.tags = tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    }

    if (req.file) {
      if (post.coverImage?.publicId) {
        await deleteImage(post.coverImage.publicId);
      }
      const { url, publicId } = await uploadImage(req.file.buffer, "devscribe/posts");
      post.coverImage = { url, publicId };
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post (author only)
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    if (post.coverImage?.publicId) {
      await deleteImage(post.coverImage.publicId);
    }

    // Clean up comments that belong to this post
    await Comment.deleteMany({ post: post._id });
    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all posts created by the logged-in user
// @route   GET /api/posts/me/mine
// @access  Private
const getMyPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// @desc    Like or unlike a post (toggle)
// @route   PUT /api/posts/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.some(
      (userId) => userId.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  toggleLike,
};
