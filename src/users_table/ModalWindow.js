import React, { Component } from 'react'
import UsersTable from './UsersTable.js';

export default class ModalWindow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false
    }
}

  render() {
      return (
        <div className="modal-window">
          ModalWindow {this.props.name}
        </div>
      )
  }
}
