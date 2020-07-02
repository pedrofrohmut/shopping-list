import axios from "axios"

import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types"

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading())
  axios.get("/items").then((response) => {
    return dispatch({
      type: GET_ITEMS,
      payload: response.data.data
    })
  })
}

export const addItem = (name) => (dispatch) => {
  axios.post("/items", { name }).then((response) => {
    return dispatch({
      type: ADD_ITEM,
      payload: response.data.data
    })
  })
}

export const deleteItem = (id) => (dispatch) => {
  axios.delete(`/items/${id}`).then(() => {
    return dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  })
}

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
})
