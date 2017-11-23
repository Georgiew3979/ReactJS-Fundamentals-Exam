import React, { Component } from 'react'
import Input from '../common/Input'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginAction } from '../../actions/authMiddlewareActions'
import { redirect } from '../../actions/authActions'


class LoginPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
  }

  onChangeHandler (e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmitHandler (e) {
    e.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.loginSuccess) {
      this.props.redirect()
      this.props.history.push('/yearly')
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='row space-top'>
          <div className='col-md-12'>
            <h1>Login</h1>
          </div>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <div className='row space-top'>
            <div className='col-md-3'>
              <Input
                onChange={this.onChangeHandler}
                name='email'
                label='Email'
                value={this.state.email}
              />
              <Input
                onChange={this.onChangeHandler}
                name='password'
                type='password'
                label='Password'
                value={this.state.password}
              />
              <input type='submit' className='btn btn-secondary' value='Login' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginSuccess: state.loginReducer.success
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: (email, password) => dispatch(loginAction(email, password)),
    redirect: () => dispatch(redirect())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
