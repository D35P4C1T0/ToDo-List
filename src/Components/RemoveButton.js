import React, { Component } from "react"

/*Recycle Bin button style*/
import "./RemoveButton.css"

/**
 * This module is pretty self-explanatory.
 * Nothing more than a recycle bin icon which
 * turns red once you hover over it and deletes
 * the entry of the list, once clicked.
 */
class RemoveButton extends Component {
  /**Removes a line-item upon clicking the trash icon*/
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
