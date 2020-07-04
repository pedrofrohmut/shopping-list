import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { NavLink } from "reactstrap"

import { logoutUser as logoutAction } from "../../actions/authActions"

const LogOut = ({ logout }) => {
  return (
    <NavLink onClick={() => logout()} href="#">
      Log out
    </NavLink>
  )
}

LogOut.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction())
})

export default connect(null, mapDispatchToProps)(LogOut)
