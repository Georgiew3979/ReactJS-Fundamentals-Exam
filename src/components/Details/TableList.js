import React, { Component } from 'react'
import Tablerow from './Tablerow'

export default class Planner extends Component {
  render () {
    let { expences, func } = this.props

    if (expences === undefined) {
      expences = [
        {
          'id': 'loading ... ',
          'year': 'loading ... ',
          'month': 'loading ... ',
          'date': 'loading ... ',
          'creationTime': 'loading ... ',
          'name': 'loading ... ',
          'amount': 'loading ... ',
          'category': 'loading ... '
        }
      ]
    }

    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Cost</th>
            <th>Payment Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            expences.map(e => (
              <Tablerow
                key={e.id}
                id={e.id}
                name={e.name}
                category={e.category}
                amount={e.amount}
                date={e.date}
                func={func} />
            ))
          }

        </tbody>
      </table>
    )
  }
}
