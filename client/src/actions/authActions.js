import axios from "axios"

import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./types"
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
