export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().authReducer.token
  // Request Header
  const config = {
    headers: {
      "Content-type": "Application/json"
    }
  }
  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token
  }
  return config
}
