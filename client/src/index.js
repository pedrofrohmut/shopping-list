import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import store from "./store"
import { loadUser } from "./actions/authActions"

import App from "./App"

// Load user when the App loads
store.dispatch(loadUser())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
