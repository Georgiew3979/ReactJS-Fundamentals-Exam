import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction, registerAction } from '../../actions/authMiddlewareActions'
import { redirect } from '../../actions/authActions'
import '../../../node_modules/toastr/build/toastr.min.css'
import toastr from 'toastr'

import Input from '../common/Input'

class RegisterPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
      repeat: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitHandler (e) {
    e.preventDefault()
    if (this.state.repeat !== this.state.password) {
      toastr.error('The password does not match!')
    } else {
      this.props.register(this.state.name, this.state.email, this.state.password)
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.registerSuccess) {
      this.props.login(this.state.email, this.state.password)
    } else if (newProps.loginSuccess) {
      this.props.redirect()
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Register</h1>
            <p>Please fill all fields.</p>
          </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className='row'>
            <div className='col-md-3'>
              <Input
                onChange={this.onChangeHandler}
                name='name'
                label='Username'
                value={this.state.name}
                />
              <Input
                onChange={this.onChangeHandler}
                name='email'
                label='E-mail'
                value={this.state.email}
              />
              <Input
                onChange={this.onChangeHandler}
                name='password'
                type='password'
                label='Password'
                value={this.state.password}
              />
              <Input
                onChange={this.onChangeHandler}
                name='repeat'
                type='password'
                label='Repeat password'
                value={this.state.repeat}
              />
                
              <input type='submit' className='btn btn-secondary' value='Register' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    registerSuccess: state.registerReducer.success,
    loginSuccess: state.loginReducer.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    register: (name, email, password) => dispatch(registerAction(name, email, password)),
    login: (email, password) => dispatch(loginAction(email, password)),
    redirect: () => dispatch(redirect())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
