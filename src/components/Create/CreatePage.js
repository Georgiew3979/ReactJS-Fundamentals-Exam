import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addExpAction } from '../../actions/authMiddlewareActions'
import { CURRENT_YEAR } from '../../actions/actionTypes'

import Input from '../common/Input'

class CreatePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      category: '',
      number: '',
      paymentDate: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitHandler (e) {
    e.preventDefault()
    let obj = {
      date: Number(this.state.paymentDate),
      name: this.state.name,
      category: this.state.category,
      amount: Number(this.state.number)
    }
    this.props.addExp(CURRENT_YEAR, this.props.match.params.id, obj)
      .then((res) => {
        if (res.success) {
          this.props.history.push('/details/' + this.props.match.params.id)
        }
      })
  }

  render () {
    if (this.props.isLogin) {
      return (
        <div className='container'>
          <div className='row space-top'>
            <div className='col-md-12'>
              <h1>Add Expenses</h1>
              <h3>November 2017</h3>
            </div>
          </div>
          <div className='row space-top'>
            <div className='col-md-10'>
              <form onSubmit={this.onSubmitHandler}>
                <legend>Add a new expense</legend>
                <Input
                  onChange={this.onChangeHandler}
                  name='name'
                  label='Name'
                  value={this.state.name}
                />
              
                <div className='form-group'>
                  <label className='col-md-2' htmlFor='category'>Category:</label>
                  <select className='col-md-3 pl-2' name='category' onChange={this.onChangeHandler} value={this.state.category}>
                    <option>Select from list</option>
                    <option>Fixed</option>
                    <option>Variable</option>
                  </select>
                </div>
                <Input
                  onChange={this.onChangeHandler}
                  name='number'
                  label='Cost'
                  type='number'
                  value={this.state.number}
                  />
              
                <Input
                  onChange={this.onChangeHandler}
                  name='paymentDate'
                  label='Payment Date'
                  value={this.state.paymentDate}
                  />
                
                <input type='submit' className='btn btn-secondary' value='Add' />
              </form>
            </div>
          </div>
        </div>
      )
    } else {
      return (<Redirect to='/login' />)
    }
  }
}

function mapStateToProps (state) {
  return {
    result: state.monthlyReducer,
    isLogin: state.loginReducer.logginIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addExp: (year, month, data) => dispatch(addExpAction(year, month, data))

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePage))
