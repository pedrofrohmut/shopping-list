import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types"

export const getItems = () => ({
  type: GET_ITEMS
})

export const addItem = (name) => ({
  type: ADD_ITEM,
  payload: name
})

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id
})
