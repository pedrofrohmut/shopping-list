const jwt = require("jsonwebtoken")

// Check req for authorization token
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token")
    // Check for token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token. Authorization denied."
      })
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Add user from payload
    req.user = decoded
    next()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error: error to validate token"
    })
  }
}

module.exports = auth
