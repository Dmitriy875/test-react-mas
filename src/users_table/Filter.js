import React, { Component } from 'react'

export default class Filter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      works: true
    }
  }

  render() {
    return (
      <div className='filter'>
        <h4>Фильтр</h4>
        <div>
          <span>Username</span><input placeholder="Username" type="text"/>
        </div>
        <div>
          <span>Website</span><input placeholder="Website" type="text"/>
        </div>
      <button>Сбросить</button>
      <button>Применить</button>
      </div>
    )
  }
}
