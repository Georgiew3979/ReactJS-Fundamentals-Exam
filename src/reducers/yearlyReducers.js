import { GET_YEAR_SUCCESS, GET_MONTH_SUCCESS, ADD_EXPENCIVE, DELETE_EXPENCIVE, UPDATE_MONTHLY_DATA } from '../actions/actionTypes'

export function yearlyReducer (state = {}, action) {
  switch (action.type) {
    case GET_YEAR_SUCCESS:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

export function monthlyReducer (state = {budget: 0, income: 0, expenses: []}, action) {
  switch (action.type) {
    case GET_MONTH_SUCCESS:
      return Object.assign({}, state, action.data)
    case UPDATE_MONTHLY_DATA:
      state.budget = action.data.budget
      state.income = action.data.income
      return state
    case ADD_EXPENCIVE:
      state.expenses.push(action.data)
      return state
    case DELETE_EXPENCIVE:
      let currentExpenses = state.expenses
      let targetExp = currentExpenses.filter(x => (x.id === action.data))[0]
      let index = state.expenses.indexOf(targetExp)
      if (index !== -1) {
        state.expenses.splice(index, 1)
      }
      return state
    default:
      return state
  }
}


