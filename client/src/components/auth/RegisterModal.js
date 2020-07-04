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

import { registerUser as registerAction } from "../../actions/authActions"
import { clearErrors as clearErrorsAction } from "../../actions/errorActions"

const RegisterModal = ({
  isAuthenticated,
  error,
  registerUser,
  clearErrors
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState(null)

  const toggle = () => {
    setIsOpen(!isOpen)
    clearErrors()
  }

  useEffect(() => {
    if (error && error.id === "REGISTER_FAIL") {
      // setMessage(error.message.message)
      setMessage("Fail to register an user. Please enter all fields")
    } else {
      setMessage(null)
    }
  }, [error])

  return (
    <Container className="RegisterModal">
      <NavLink onClick={() => toggle()} href="#">
        Register
      </NavLink>
      <Modal isOpen={isOpen} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Register User</ModalHeader>
        <ModalBody>
          {message && <Alert color="danger">{message}</Alert>}
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              registerUser({ name, email, password })
              setName("")
              setEmail("")
              setPassword("")
              setIsOpen(false)
            }}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="mb-3"
              />
            </FormGroup>
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
              Register user
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  )
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    message: PropTypes.shape({
      message: PropTypes.string,
      success: PropTypes.bool
    }),
    status: PropTypes.number,
    id: PropTypes.string
  }),
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
}

RegisterModal.defaultProps = {
  error: null
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  error: state.errorReducer
})

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerAction(user)),
  clearErrors: () => dispatch(clearErrorsAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
