import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    err: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onLoginSuccess = () => {
    console.log('login success')
    const {history} = this.props
    history.replace('/mytasks')
  }

  onLoginFailure = () => {
    const err = 'username or password incorrect'
    console.log('login failure', err)
    this.setState({showError: true, err})
  }

  onLoginClicked = async event => {
    event.preventDefault()
    console.log('login clicked!!')
    const {username, password} = this.state

    const url = 'https://mytasks-application.herokuapp.com/login'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    if (username === data.username && password === data.password) {
      this.onLoginSuccess()
    } else {
      this.onLoginFailure()
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-lable-container">
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          placeholder="ENTER PASSWORD"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-lable-container">
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          placeholder="ENTER USERNAME"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const {showError, err} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Login Below To Access Your Tasks</h1>
        <form className="login-container" onSubmit={this.onLoginClicked}>
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          {showError && <p className="error-message">**{err}**</p>}
        </form>
      </div>
    )
  }
}

export default Login
