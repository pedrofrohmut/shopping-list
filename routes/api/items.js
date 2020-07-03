const router = require("express").Router()

const { getAllItems, addItem, deleteItem } = require("../../controllers/items")
const auth = require("../../middleware/auth")

// @route GET api/items
// @desc Get all items
// @access Public
router.get("/", getAllItems)

// @route POST api/items
// @desc Add/Create a item
// @access Private
router.post("/", auth, addItem)

// @route DELET api/items
// @desc Delete a Item by Id
// @access Private
router.delete("/:id", auth, deleteItem)

module.exports = router
