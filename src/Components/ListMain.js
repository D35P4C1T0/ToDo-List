/* 
Description: Main Parent - Holds main state and handles all edited, deleting, and addition of items
*/

//editbutton - passes in an on click handler which toggles a itemsArr property called editing
//If editing = true then SingleToDo shows an input instead of the lineitem
//The input feeds into a setState on ListMain that does the same thing as linethrough example but instead changes itemsArr.obj.item
//
import React, { Component } from "react"

// The form module I use
import Form from "./Form.js"

// Single ToDo entry module
import SingleToDo from "./SingleTodo.js"

// Custom css styles and frameworks
import "./style/style.css"
import "./style/dark.min.css"

// Awesome Icons module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStickyNote } from "@fortawesome/free-solid-svg-icons"

class ListMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemsArr: []
    }
    this.addItem = this.addItem.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
    this.editItem = this.editItem.bind(this)
  }

  //Adds an item to the state.itemsArr
  addItem(newItem) {
    this.setState(state => ({ itemsArr: [...state.itemsArr, newItem] }))
  }
  //Edits an existing item
  editItem(editedItem) {
    const editedItemsArr = this.state.itemsArr.map(obj =>
      obj.id === editedItem.id
        ? { ...obj, item: editedItem.item, editing: !obj.editing }
        : obj
    )
    this.setState({ itemsArr: editedItemsArr })
  }

  //Adds strikethrough text upon clicking line-item
  handleComplete(id) {
    const newItemsArr = this.state.itemsArr.map(obj =>
      obj.id === id ? { ...obj, complete: !obj.complete } : obj
    )
    this.setState({ itemsArr: newItemsArr })
  }

  //not sure if this should be connected to its grandchild directly or if all info should go through the parent
  handleEditClick(id) {
    const editedItemsArr = this.state.itemsArr.map(obj =>
      obj.id === id ? { ...obj, editing: !obj.editing } : obj
    )
    this.setState({ itemsArr: editedItemsArr })
  }

  //Removes a line-item upon clicking the trash icon
  handleDelete(id) {
    this.setState({
      itemsArr: this.state.itemsArr.filter(obj => obj.id !== id)
    })
  }

  componentDidMount() {
    if (localStorage.getItem("state")) {
      this.setState(JSON.parse(localStorage.getItem("state")))
    } else {
      localStorage.setItem("state", JSON.stringify(this.state))
    }
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("state", JSON.stringify(nextState))
  }

  render() {
    //index -- used to create the ordered numbers on line-items
    //item -- is used to store the todo string
    //id -- unique indicator of this item
    //complete -- tracks whether the line-item should have strikethrough text or not
    //editing -- tracks whether the line item is being edited
    //handleDelete -- handles the removal of a line-item
    //handles the strikethrough text boolean
    const items = this.state.itemsArr.map((obj, index) => (
      <SingleToDo
        key={obj.id}
        //pretty sure I can just pass the whole object in here and not rewrite everything
        index={index}
        item={obj.item}
        id={obj.id}
        complete={obj.complete}
        editing={obj.editing}
        handleDelete={this.handleDelete}
        handleComplete={this.handleComplete}
        handleEditClick={this.handleEditClick}
        editItem={this.editItem}
      />
    ))

    return (
      <div>
        <div className="header">
          <h1>
            <FontAwesomeIcon
              icon={faStickyNote}
              style={{ marginRight: "0.3em" }}
            />
            To-Do List
          </h1>
          <Form addItem={this.addItem} />
        </div>
        <div className="itemsGrid">{items}</div>
      </div>
    )
  }
}

export default ListMain
