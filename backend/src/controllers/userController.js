const User = require("../models/User");
const { uploadImage, deleteImage } = require("../services/cloudinaryService");

// @desc    Get a user's public profile by ID
// @route   GET /api/users/:id
// @access  Public
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// @desc    Update the logged-in user's profile (name, bio, avatar)
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.bio = req.body.bio ?? user.bio;

    // If a new avatar file was uploaded, push it to Cloudinary and
    // remove the old one so we don't leave orphaned images behind
    if (req.file) {
      if (user.avatar?.publicId) {
        await deleteImage(user.avatar.publicId);
      }
      const { url, publicId } = await uploadImage(req.file.buffer, "devscribe/avatars");
      user.avatar = { url, publicId };
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfile, updateUserProfile };
