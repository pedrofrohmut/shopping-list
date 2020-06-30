import React, { useState, useEffect } from "react"
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { v4 as uuid } from "uuid"
import { connect } from "react-redux"
import { getItems } from "../actions/itemActions"
import PropTypes from "prop-types"

const ShoppingList = ({ items }) => {
  useEffect(() => {
    getItems()
  })
  // const [items, setItems] = useState(initialItems)
  return (
    <>
      <Container className="ShoppingList mb-4">
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          // onClick={() => {
          //   const name = prompt("Enter Item")
          //   if (name && name !== "") {
          //     setItems([...items, { id: uuid(), name }])
          //   }
          // }}
        >
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map((item) => (
              <CSSTransition key={item.id} timeout={400} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn mr-3"
                    color="danger"
                    size="sm"
                    // onClick={() => {
                    //   setItems(items.filter((i) => i.id !== item.id))
                    // }}
                  >
                    &times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  )
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  items: state.itemReducer.items
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
