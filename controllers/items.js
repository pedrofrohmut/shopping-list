const Item = require("../models/Item")

exports.getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ date: -1 })
    return res.status(200).json({
      success: true,
      data: items,
      count: items.length
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Error: error to get all items: " + err.message
    })
  }
}

exports.addItem = async (req, res, next) => {
  try {
    const item = await Item.create(req.body)
    return res.status(201).json({
      success: true,
      data: item,
      message: "Created: new item created"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Error: error to create new Item: " + err.message
    })
  }
}

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id)
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "Bad Request: No item found with the passed Id"
      })
    }
    await Item.deleteOne({ _id: item._id })
    return res.status(200).json({
      success: true,
      message: "Success: Item deleted"
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Error: error to delete an item: " + err.message
    })
  }
}
