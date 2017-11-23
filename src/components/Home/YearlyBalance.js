import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getYearDataAction } from '../../actions/authMiddlewareActions'
import { CURRENT_YEAR } from '../../actions/actionTypes'
import { selectMonthName } from '../../utils/commonFunctions'

import Month from './Month'

class YearlyBalance extends Component {
  componentWillMount () {
    this.props.getYearInformation(CURRENT_YEAR)
  }

  render () {
    let data = this.props.item
    if (Object.keys(data).length === 0) {
      data = {1: {balance: 0, budget: 0}}
    }
    let month = Object.keys(data)
    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Yearly Balance</h1>
          </div>
        </div>
        <div className='row space-top col-md-12'>
          { month.map(m => (
            <Month key={m} data={m} monthName={selectMonthName(m)} year={CURRENT_YEAR} alldata={data} />
          ))
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    item: state.yearlyReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getYearInformation: (page) => dispatch(getYearDataAction(page))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(YearlyBalance))
