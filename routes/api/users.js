const router = require("express").Router()

const { registerUser, loginUser } = require("../../controllers/users")

// @route POST api/users
// @desc Register new user
// @access Public
router.route("/").post(registerUser)

// @route POST api/users/login
// @desc Log in a user
// @access Public
router.route("/login").post(loginUser)

module.exports = router
