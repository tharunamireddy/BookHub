import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showpass: false,
    error: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
    console.log(event.target.value)
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }

  showpassword = () => {
    this.setState(prev => ({showpass: !prev.showpass}))
  }

  formSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails, username)

    const url = `https://apis.ccbp.in/login`

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()

    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({error: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {showpass, error, errMsg, username, password} = this.state
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/')
    }
    const type = showpass ? 'text' : 'password'
    return (
      <div className="Main-container">
        <div className="login-img-container">
          <img
            src="https://res.cloudinary.com/dwch0edff/image/upload/v1716218105/Rectangle_1467_yuf4tk.png"
            className="login-img"
            alt="login website logo"
          />
        </div>
        <div className="login-container">
          <div className="card">
            <div className="logo-container">
              <img
                src="https://res.cloudinary.com/dwch0edff/image/upload/v1716218104/Group_7730_z8fzor.png"
                alt="website login"
                className="logo"
              />
              <h1 className="logo-heading">ook Hub</h1>
            </div>
            <form onSubmit={this.formSubmit}>
              <label htmlFor="username" className="login-label">
                Username*
              </label>
              <br />
              <input
                onChange={this.onChangeUsername}
                className="login-input"
                id="username"
                value={username}
                placeholder="Enter your username"
              />
              <br />
              <label htmlFor="password" className="login-label">
                Password*
              </label>
              <br />
              <input
                onChange={this.onChangePassword}
                className="login-input"
                id="password"
                value={password}
                type={type}
                placeholder="Enter your password"
              />
              <input
                onClick={this.showpassword}
                type="checkbox"
                id="showpassword"
                className="input-checkbox"
              />
              <label className="login-label" htmlFor="showpassword">
                Show Password
              </label>
              <button className="button" type="submit">
                Login
              </button>
              {error ? <p className="err-msg">{errMsg}</p> : null}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
