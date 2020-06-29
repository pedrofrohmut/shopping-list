import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AppNavbar from "./components/layout/AppNavbar"
import ShoppingList from "./components/ShoppingList"


const App = () => (
  <>
    <AppNavbar />
    <ShoppingList />
  </>
)

export default App
