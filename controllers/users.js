const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const auth = require("../middleware/auth")

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
      data: { name, email, id: createdUser._id },
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

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body
  // Simple validation
  if (!email || email === "" || !password || password === "") {
    return res.status(400).json({
      success: false,
      message: "Bad Request: The input was not valid and user cant be added"
    })
  }
  try {
    // Check if existing user
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: No user found with passed e-mail"
      })
    }
    // Validate user password
    const passwordsMatch = await bcrypt.compare(password, existingUser.password)
    if (!passwordsMatch) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: Password did not matched for the passed e-mail"
      })
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    })
    return res.status(200).json({
      success: true,
      data: {
        user: existingUser,
        token
      },
      message: "Success: User logged in"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: error to log in User: " + err.message
    })
  }
}

exports.validateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    return res.status(200).json({
      success: true,
      data: user,
      message: "Success: user authenticated"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: error to validate user"
    })
  }
}
