import { v4 as uuid } from "uuid"

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "../actions/types"

const INITIAL_STATE = {
  items: [
    { id: uuid(), name: "Eggs" },
    { id: uuid(), name: "Milk" },
    { id: uuid(), name: "Steak" },
    { id: uuid(), name: "Water" },
    { id: uuid(), name: "Cake" },
    { id: uuid(), name: "Cookies" },
    { id: uuid(), name: "Grapes" }
  ]
}

const itemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state
      }
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, { id: uuid(), name: action.payload }]
      }
    case DELETE_ITEM:
      console.log("DELETE_ITEM CALLED")
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload)
      }
    default:
      return {
        ...state
      }
  }
}

export default itemReducer
