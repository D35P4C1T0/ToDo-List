import React, { Component } from "react"
import uuid from "uuid/v4"

/**
 * The Form component is what handles the major part
 * of the user input "post processing" and additional items
 */
class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: "",
      complete: false,
      editing: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  /**Automatically sets the local state while user types*/
  handleChange(event) {
    this.setState({
      item: event.target.value
    })
  }
  /**Pushes the item to the ListMain state*/
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.item !== "") {
      const newItem = { ...this.state, id: uuid() }
      this.props.addItem(newItem)
      this.setState({ item: "" })
    }
  }

  render() {
    const userInputLabel = <label htmlFor="todo Input"></label>
    const userInput = (
      <input
        onChange={this.handleChange}
        type="text"
        id="todo Input"
        name="item"
        value={this.state.item}
        placeholder="Contenuto della Nota"
      ></input>
    )
    const submitButton = (
      <button className="addNotaButton">Aggiungi Nota</button>
    )

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {userInputLabel}
          {userInput}
          {submitButton}
        </form>
      </div>
    )
  }
}

export default Form
