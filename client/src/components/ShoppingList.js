import React, { useState } from "react"
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { v4 as uuid } from "uuid"

const initialItems = [
  { id: uuid(), name: "Eggs" },
  { id: uuid(), name: "Milk" },
  { id: uuid(), name: "Steak" },
  { id: uuid(), name: "Water" }
]

const ShoppingList = () => {
  const [items, setItems] = useState(initialItems)
  return (
    <Container className="ShoppingList mb-4">
      <pre>{JSON.stringify(items, null, 4)}</pre>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          const name = prompt("Enter Item")
          if (name && name !== "") {
            setItems([...items, { id: uuid(), name }])
          }
        }}
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
                  onClick={() => {
                    setItems(items.filter((i) => i.id !== item.id))
                  }}
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
  )
}

export default ShoppingList
