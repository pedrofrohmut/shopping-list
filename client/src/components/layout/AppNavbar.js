import React, { useState } from "react"
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import RegisterModal from "../auth/RegisterModal"
import LogInModal from "../auth/LogInModal"
import LogOut from "../auth/LogOut"

const AppNavbar = ({ isAuthenticated, user }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Navbar color="dark" dark expand="sm" className="mb-5">
      <Container>
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuthenticated && (
              <>
                <NavItem>
                  <RegisterModal />
                </NavItem>
                <NavItem>
                  <LogInModal />
                </NavItem>
              </>
            )}
            {isAuthenticated && (
              <>
                {user && user.name && (
                  <NavItem>
                    <span className="navbar-text mr-3">
                      Welcome <strong>{user.name}</strong>
                    </span>
                  </NavItem>
                )}
                <NavItem>
                  <LogOut />
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}

AppNavbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number
  })
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
})

export default connect(mapStateToProps)(AppNavbar)
