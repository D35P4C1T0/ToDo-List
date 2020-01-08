/**
 * This module handles the creation of each line-item, calls
 * the strike-through text function
 * and does other stuff.
 */
import React, { Component } from "react"

/*Recycle Bin button module*/
import RemoveButton from "./RemoveButton.js"

/*Styling:*/
import "./SingleToDo.css"
import "./style/dark.min.css"
import "./style/style.css"

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.item,
      id: ""
    }
  }

  /**Adds strikethrough text upon clicking line-item*/
  handleClick = () => {
    this.props.handleComplete(this.props.id)
  }
  /**Handle user inputting data while editing*/
  handleChange = event => {
    this.setState({
      item: event.target.value
    })
  }
  /**Handles submission of a line-item edit. This might not be implemented in the final version*/
  handleEditSubmit = event => {
    event.preventDefault()
    if (this.state.item !== "") {
      const editedItem = {
        id: this.props.id,
        item: this.state.item
      }
      this.props.editItem(editedItem)
      this.setState({ item: "" })
    } else {
      this.setState({ item: this.props.item })
    }
  }

  render() {
    //CSS Variables
    const evenRowCond = this.props.index % 2 === 0 ? "evenRowCond" : ""
    const completeCond = this.props.complete ? "completeCond" : ""
    //React Variables
    const itemFormatted = !this.props.editing ? (
      <span className={"lineRowText"} onClick={this.handleClick}>
        <span>{this.props.index + 1}.</span>{" "}
        <span className={completeCond}>{this.props.item}</span>
      </span>
    ) : (
      <span className="editing">
        {this.props.index + 1}.&nbsp;&nbsp;
        <form onSubmit={this.handleEditSubmit}>
          <input
            className="editingForm"
            onChange={this.handleChange}
            type="text"
            id="todo Input Edit"
            name="item"
            value={this.state.item}
            placeholder="Edit Item"
          ></input>
        </form>
      </span>
    )
    // const userInputLabel = (
    //   <label htmlFor="todo Input Edit" className="taskFiled"></label>
    // )
    const removeButton = (
      <RemoveButton handleDelete={this.props.handleDelete} id={this.props.id} />
    )
    // const editButton = (
    //   <EditButton
    //     handleEditClick={this.props.handleEditClick}
    //     id={this.props.id}
    //   />
    // )

    return (
      <div className={`itemRow ${evenRowCond}`}>
        {itemFormatted}
        {/* {editButton} */}
        {removeButton}
      </div>
    )
  }
}
export default Edit
