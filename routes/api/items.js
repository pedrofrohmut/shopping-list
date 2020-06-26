const router = require("express").Router()

const { getAllItems, addItem, deleteItem } = require("../../controllers/items")

// @route GET api/items
// @desc Get all items
// @access Public
router.route("/").get(getAllItems)

// @route POST api/items
// @desc Add/Create a item
// @access Public
router.route("/").post(addItem)

// @route DELET api/items
// @desc Delete a Item by Id
// @access Public
router.route("/:id").delete(deleteItem)

module.exports = router
