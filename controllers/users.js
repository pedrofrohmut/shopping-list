const bcrypt = require("bcryptjs")

const User = require("../models/User")

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body
  // Simple validation
  if (
    !name ||
    name === "" ||
    !email ||
    email === "" ||
    !password ||
    password === ""
  ) {
    return res.status(400).json({
      success: false,
      message: "Bad Request: The input was not valid and user cant be added"
    })
  }
  try {
    // Check if existing user
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: User already exists"
      })
    }
    // Create salt & hash
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = { name, email, password: hash }
    const createdUser = await User.create(newUser)
    return res.status(200).json({
      success: true,
      data: createdUser,
      message: "Created: new user created"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: error to register an User: " + err.message
    })
  }
}
