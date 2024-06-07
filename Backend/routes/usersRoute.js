const express = require("express");
const {
  signup,
  login,
  protect,
  onlyAdmin,
} = require("../controllers/authController");
const { GetUser, GetAllUsers } = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", protect, onlyAdmin, signup);
router.post("/login", login);

router.get("/getUser", protect, GetUser);
router.get("/getAllUsers", protect, onlyAdmin, GetAllUsers);

module.exports = router;
