import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateMonthlyAction } from '../../actions/authMiddlewareActions'
import { CURRENT_YEAR } from '../../actions/actionTypes'


import Input from '../common/Input'

class Planner extends Component {
  constructor (props) {
    super(props)

    this.state = {
      income: '',
      budget: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitHandler (e) {
    e.preventDefault()
    let data = {
      income: Number(this.state.income),
      budget: Number(this.state.budget)
    }
    this.props.updateMonthly(CURRENT_YEAR, this.props.match.params.id, data)
      .then((res) => {
        if (res.success) {
          this.props.history.push('/yearly')
        }
      })
  }

  render () {
    
    return (
      <div className='col-md-3 space-top'>
        <h4>Planner</h4>
        <form onSubmit={this.onSubmitHandler}>
          <Input
            onChange={this.onChangeHandler}
            name='income'
            type='number'
            label='Income:'
            value={this.state.income}
                />
          <Input
            onChange={this.onChangeHandler}
            name='budget'
            type='number'
            label='Budget:'
            value={this.state.budget}
          />
          
          <input type='submit' className='btn btn-secondary' value='Save' />
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    items: state.monthlyReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateMonthly: (year, month, data) => dispatch(updateMonthlyAction(year, month, data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Planner))

