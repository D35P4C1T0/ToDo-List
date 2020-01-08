/* 
Description: Adds the remove icon and calls the line-item removal function on click
*/

import React, { Component } from "react"

// Recycle Bin button style
import "./RemoveButton.css"

class RemoveButton extends Component {
  //Removes a line-item upon clicking the trash icon
  handleDelete = () => {
    this.props.handleDelete(this.props.id)
  }

  render() {
    const trashIcon = (
      <i onClick={this.handleDelete} class="fas fa-trash-alt"></i>
    )

    return <span>{trashIcon}</span>
  }
}

export default RemoveButton
