import { login, register, getYearData, getMonthData, addExpencive, deleteExpencive, updateMonthlyData } from '../utils/remote'
import { loginSuccess, registerSuccess } from './authActions'
import { yearlySuccess, monthlySuccess, addExpSuccess, deleteExpSuccess, updateMonthlyDataSuccess } from './yearlyAction'

import '../../node_modules/toastr/build/toastr.min.css'
import toastr from 'toastr'

function registerAction (name, email, password) {
  return (dispatch) => {
    return register(name, email, password)
      .then(json => {
        if (json.success) {
          toastr.success(json.message)
          dispatch(registerSuccess())
        } else {
          toastr.error(json.message)
          for (let er in json.errors) {
            toastr.error(json.errors[er])
          }
        }
      }).catch((e) => { toastr.error(e.message) })
  }
}

function loginAction (email, password) {
  return (dispatch) => {
    return login(email, password)
      .then(json => {
        if (json.success) {
          toastr.success(json.message)
          window.localStorage.setItem('authToken', json.token)
          window.localStorage.setItem('user', json.user.name)
          dispatch(loginSuccess())
        } else {
          toastr.error(json.message)
          for (let er in json.errors) {
            toastr.error(json.errors[er])
          }
         
        }
      }).catch((e) => { toastr.error(e.message) })
  }
}

function logoutAction () {
  return (dispatch) => {
    window.localStorage.clear()
  }
}

function getYearDataAction (data) {
  return (dispatch) => {
    return getYearData(data)
      .then(json => {
        dispatch(yearlySuccess(json))
      }).catch((e) => { console.log(e) })
  }
}

function getMonthDataAction (year, month) {
  return (dispatch) => {
    return getMonthData(year, month)
      .then(json => {
        dispatch(monthlySuccess(json))
      }).catch((e) => { console.log(e) })
  }
}

function addExpAction (year, month, data) {
  return (dispatch) => {
    return addExpencive(year, month, data)
      .then(json => {
        if (json.success) {
          toastr.success(json.message)
          dispatch(addExpSuccess(json.expense))
        } else {
          toastr.error(json.message)
          for (let er in json.errors) {
            toastr.error(json.errors[er])
          }
        }
        return json
      }).catch((e) => { toastr.error(e.message) })
  }
}

function deleteExpAction (id) {
  return (dispatch) => {
    return deleteExpencive(id)
      .then(json => {
        if (json.success) {
          toastr.success(json.message)
          dispatch(deleteExpSuccess(json.expense))
        } else {
          toastr.error(json.message)
          for (let er in json.errors) {
            toastr.error(json.errors[er])
          }
        }
        return json
      }).catch((e) => { toastr.error(e.message) })
  }
}

function updateMonthlyAction (year, month, data) {
  return (dispatch) => {
    return updateMonthlyData(year, month, data)
      .then(json => {
        if (json.success) {
          toastr.success(json.message)
          dispatch(updateMonthlyDataSuccess(json.plan))
        } else {
          toastr.error(json.message)
          for (let er in json.errors) {
            toastr.error(json.errors[er])
          }
        }
        return json
      }).catch((e) => { toastr.error(e.message) })
  }
}

export {
  registerAction,
  loginAction,
  logoutAction,
  getYearDataAction,
  getMonthDataAction,
  addExpAction,
  deleteExpAction,
  updateMonthlyAction
}
