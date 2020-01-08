/* 
Description: Adds the edit icon and calls the line-item edit function on click
*/

import React, { Component } from "react"

//Edit button style
import "./EditButton.css"

/**
 * The EditButton can be used to allow the name of the
 * task to be edited with ease.
 */
class EditButton extends Component {
  //Edits a line-item upon clicking the edit icon
  handleEditClick = () => {
    this.props.handleEditClick(this.props.id)
  }
  render() {
    return (
      <span onClick={this.handleEditClick}>
        <i class="fas fa-edit"></i>
      </span>
    )
  }
}

export default EditButton
