import { LOGIN_SUCCESS, REGISTER_SUCCESS, REDIRECTED, LOGOUT } from './actionTypes'

function registerSuccess () {
  return {
    type: REGISTER_SUCCESS
  }
}

function loginSuccess () {
  return {
    type: LOGIN_SUCCESS
  }
}

function redirect () {
  return {
    type: REDIRECTED
  }
}

function logout () {
  return {
    type: LOGOUT
  }
}

export { registerSuccess, loginSuccess, redirect, logout }

