import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { logout } from './actions/authActions'
import { connect } from 'react-redux'
import { logoutAction } from './actions/authMiddlewareActions'

import './style/bootstrap.min.css'
import './style/site.css'

import Header from './components/common/Header'
import Footer from './components/common/Footer'
import LoginPage from './components/Auth/LoginPage'
import RegisterPage from './components/Auth/RegisterPage'
import CreatePage from './components/Create/CreatePage'
import DetailsPage from './components/Details/DetailsPage'
import YearlyBalance from './components/Home/YearlyBalance'
import NotFound from './components/common/NotFoundPage'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loggedIn: false
    }

    this.onLogout = this.onLogout.bind(this)
  }


  onLogout (e) {
    this.props.logoutFromSite()
    this.props.clearLocalStorage()
    this.props.history.push('/')
  }

  componentDidMount () {
    if (window.localStorage.authToken) {
      this.setState({loggedIn: true})
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({loggedIn: newProps.loginIn})
  }

  render () {
    return (
      <div >
        <Header
          items={0}
          users={0}
          loggedIn={this.state.loggedIn}
          logout={this.onLogout}
        />
        <main>
          <Switch>
            <Route exact path='/' component={LoginPage} />
            <Route path='/create/:id' component={CreatePage} />
            <Route path='/yearly' component={YearlyBalance} />
            <Route path='/details/:id' component={DetailsPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={RegisterPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    loginIn: state.loginReducer.logginIn
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logoutFromSite: () => dispatch(logout()),
    clearLocalStorage: () => dispatch(logoutAction())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
