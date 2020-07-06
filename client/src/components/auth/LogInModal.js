import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {
  Container,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  Alert
} from "reactstrap"

import { logInUser as loginAction } from "../../actions/authActions"
import { clearErrors as clearErrorsAction } from "../../actions/errorActions"

const LogInModal = ({ isAuthenticated, error, loginUser, clearErrors }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState(null)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const toggle = () => {
    setIsOpen(!isOpen)
    clearErrors()
  }

  useEffect(() => {
    if (error && error.id === "LOGIN_FAIL") {
      // setMessage(error.message.message)
      setMessage("Fail to log in an user. Please enter all fields")
    } else {
      setMessage(null)
    }

    if (isOpen && isAuthenticated) {
      setIsOpen(false)
      clearErrors()
    }
  }, [error, isOpen, isAuthenticated, clearErrors])

  return (
    <Container className="LogInModal">
      <NavLink className="text-white" onClick={() => toggle()} href="#">
        Log In
      </NavLink>
      <Modal isOpen={isOpen} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Log In User</ModalHeader>
        <ModalBody>
          {message && <Alert color="danger">{message}</Alert>}
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              loginUser({ email, password })
            }}
          >
            <FormGroup>
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter valid an active e-mail"
                className="mb-3"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a secure password"
                className="mb-4"
              />
            </FormGroup>
            <Button color="dark" block>
              Log In User
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  )
}

LogInModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.shape({
    message: PropTypes.shape({
      message: PropTypes.string,
      success: PropTypes.bool
    }),
    status: PropTypes.number,
    id: PropTypes.string
  }),
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

LogInModal.defaultProps = {
  error: null
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errorReducer
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (user) => dispatch(loginAction(user)),
  clearErrors: () => dispatch(clearErrorsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(LogInModal)
