const express = require("express");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.put("/me", protect, upload.single("avatar"), updateUserProfile);
router.get("/:id", getUserProfile);

module.exports = router;
