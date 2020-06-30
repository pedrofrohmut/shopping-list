import React, { useState } from "react"
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap"
import { connect } from "react-redux"
import { addItem as addItemAction } from "../actions/itemActions"
import PropTypes from "prop-types"

const ItemModal = ({ addItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [itemName, setItemName] = useState("")

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => toggle()}
      >
        Add Item
      </Button>
      <Modal isOpen={isOpen} toggle={() => toggle()}>
        <ModalHeader toggle={() => toggle()}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              if (itemName && itemName !== "") {
                addItem(itemName)
                setItemName("")
                setIsOpen(false)
              }
            }}
          >
            <FormGroup>
              <Label htmlFor="item">Item</Label>
              <Input
                id="item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Add shopping item"
              />
              <Button color="dark" className="mt-3" block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  )
}

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (name) => dispatch(addItemAction(name))
})

export default connect(null, mapDispatchToProps)(ItemModal)
