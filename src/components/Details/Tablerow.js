import React, { Component } from 'react'

export default class Planner extends Component {
  render () {
    const { date, amount, category, name, id, func } = this.props

    return (
      <tr>
        <td>{name}</td>
        <td>{category}</td>
        <td>{amount}</td>
        <td>{date}</td>
        <td>
          <button onClick={() => func(id)} className='btn btn-secondary'>Delete</button>
        </td>
      </tr>
    )
  }
}
