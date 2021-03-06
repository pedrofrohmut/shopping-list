import axios from "axios"

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types"
import { returnErrors } from "./errorActions"
import { tokenConfig } from "../utils/auth"

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: USER_LOADING
  })
  const config = tokenConfig(getState)
  axios
    .get("/users/auth", config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Register user
export const registerUser = ({ name, email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }
  const body = JSON.stringify({ name, email, password })
  axios
    .post("/users", body, config)
    .then((res) => {
      console.log("REGISTER", res.data)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      )
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

// Log in user
export const logInUser = ({ email, password }) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }
  const body = JSON.stringify({ email, password })
  axios
    .post("/users/login", body, config)
    .then((res) => {
      console.log("LOGIN", res.data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      )
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// LogOut
export const logoutUser = () => ({
  type: LOGOUT_SUCCESS
})
