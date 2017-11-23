import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { getMonthDataAction, deleteExpAction } from '../../actions/authMiddlewareActions'
import { CURRENT_YEAR } from '../../actions/actionTypes'
import { selectMonthName } from '../../utils/commonFunctions'


import Planner from './Planner'
import TableList from './TableList'

class DetailsPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      income: '',
      budget: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onDeleteExpencive = this.onDeleteExpencive.bind(this)
  }

  onChange (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onDeleteExpencive (id) {
    this.props.deleteExpenciveById(id)
    this.props.getMonthInformation(CURRENT_YEAR, this.props.match.params.id)
  }

  componentDidMount () {
    if (this.props.isLogin) {
      this.props.getMonthInformation(CURRENT_YEAR, this.props.match.params.id)
    }
  }

  render () {
    if (this.props.isLogin) {
      return (
        <div className='container'>
          <div className='row space-top'>
            <div className='col-md-12'>
                <h1>Welcome to Budget Planner</h1>
            </div>
          </div>
          <div className='row space-top '>
            <div className='col-md-12 '>
              <div className='card bg-secondary'>
                <div className='card-body'>
                  <blockquote className='card-blockquote'>
                    <h2 id='month'>{selectMonthName(this.props.match.params.id)} {CURRENT_YEAR}</h2>
                    <div className='row'>
                      <Planner />
                      <div className='col-md-8 space-top'>
                        <div className='row'>
                          <h4 className='col-md-9'>Expenses</h4>
                          <Link to={'/create/' + this.props.match.params.id} className='btn btn-secondary ml-2 mb-2'>Add expenses</Link>
                        </div>
                        <TableList expences={this.props.items.expenses} func={this.onDeleteExpencive} />
                      </div>
                    </div>
                  </blockquote>
                </div>
              </div>
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
    items: state.monthlyReducer,
    isLogin: state.loginReducer.logginIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getMonthInformation: (year, month) => dispatch(getMonthDataAction(year, month)),
    deleteExpenciveById: (id) => dispatch(deleteExpAction(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailsPage))
