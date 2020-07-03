const router = require("express").Router()

const {
  registerUser,
  loginUser,
  validateUser
} = require("../../controllers/users")
const auth = require("../../middleware/auth")

// @route POST api/users
// @desc Register new user
// @access Public
router.post("/", registerUser)

// @route POST api/users/login
// @desc Log in a user
// @access Public
router.post("/login", loginUser)

// @route GET api/users/auth
// @desc Log in a user
// @access Private
router.get("/auth", auth, validateUser)

module.exports = router
