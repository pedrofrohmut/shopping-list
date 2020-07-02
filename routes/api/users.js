const router = require("express").Router()

const { registerUser } = require("../../controllers/users")

// @route POST api/users
// @desc Register new users
// @access Public
router.route("/").post(registerUser)

module.exports = router
