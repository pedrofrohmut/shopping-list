const express = require("express")
const dotenv = require("dotenv")

const connectDB = require("./config/db")

dotenv.config({ path: "./config/config.env" })

connectDB()

// Express Initialization
const app = express()

/**
 * MIDDLEWARES
 */
// Parses request body to json
app.use(express.json())

/**
 * ROUTES
 */
app.use("/api/v1/items", require("./routes/api/items"))
app.use("/api/v1/users", require("./routes/api/users"))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("Server is running on port: " + PORT))
