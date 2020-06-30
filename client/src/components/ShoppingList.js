import React, { useEffect } from "react"
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { connect } from "react-redux"
import {
  getItems as getItemsAction,
  deleteItem as deleteItemAction
} from "../actions/itemActions"
import PropTypes from "prop-types"

const ShoppingList = ({ items, getItems, deleteItem }) => {
  useEffect(() => {
    getItems()
  })

  return (
    <>
      <Container className="ShoppingList mb-4">
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map((item) => (
              <CSSTransition key={item.id} timeout={400} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn mr-3"
                    color="danger"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
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
  deleteItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  items: state.itemReducer.items
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItemsAction),
  deleteItem: (id) => dispatch(deleteItemAction(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)
