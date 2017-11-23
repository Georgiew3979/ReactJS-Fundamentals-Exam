import { GET_YEAR_SUCCESS, GET_MONTH_SUCCESS, ADD_EXPENCIVE, DELETE_EXPENCIVE, UPDATE_MONTHLY_DATA } from './actionTypes'

function yearlySuccess (data) {
  return {
    type: GET_YEAR_SUCCESS,
    data
  }
}

function monthlySuccess (data) {
  return {
    type: GET_MONTH_SUCCESS,
    data
  }
}

function addExpSuccess (data) {
  return {
    type: ADD_EXPENCIVE,
    data
  }
}

function deleteExpSuccess (data) {
  return {
    type: DELETE_EXPENCIVE,
    data
  }
}

function updateMonthlyDataSuccess (data) {
  return {
    type: UPDATE_MONTHLY_DATA,
    data
  }
}


export { yearlySuccess, monthlySuccess, addExpSuccess, deleteExpSuccess, updateMonthlyDataSuccess }
