const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    // Save User to DB
    const createdUser = await User.create({ name, email, password: hash })
    // Gen Token
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    })
    return res.status(201).json({
      success: true,
      data: createdUser,
      token,
      message: "Created: new user created"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: error to register an User: " + err.message
    })
  }
}
