import axios from "axios"

import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types"
import { returnErrors } from "./errorActions"
import { tokenConfig } from "../utils/auth"

export const getItems = () => (dispatch) => {
  dispatch(setItemsLoading())
  axios
    .get("/items")
    .then((response) => {
      dispatch({
        type: GET_ITEMS,
        payload: response.data.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const addItem = (name) => (dispatch, getState) => {
  axios
    .post("/items", { name }, tokenConfig(getState))
    .then((response) => {
      dispatch({
        type: ADD_ITEM,
        payload: response.data.data
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const deleteItem = (id) => (dispatch, getState) => {
  axios
    .delete(`/items/${id}`, tokenConfig(getState))
    .then(() => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    })
}

export const setItemsLoading = () => ({
  type: ITEMS_LOADING
})
