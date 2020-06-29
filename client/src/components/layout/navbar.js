import React, { useState } from "react"

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from "reactstrap"

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">

    </Navbar>
  )
}

export default AppNavbar
