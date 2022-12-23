import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Password from '../Password'
import './index.css'

class PasswordManager extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    search: '',
    passwordHidden: false,
    passwordsList: [],
  }

  onWebsiteChange = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onAddPassword = () => {
    const {websiteName, userName, password} = this.state

    if (websiteName !== '' && userName !== '' && password !== '') {
      const newPasswordItem = {
        id: uuidv4(),
        websiteName,
        userName,
        password,
      }

      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswordItem],
        websiteName: '',
        userName: '',
        password: '',
      }))
    }
  }

  onTogglePasswords = () => {
    this.setState(prevState => ({passwordHidden: !prevState.passwordHidden}))
  }

  deleteAPassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each => each.id !== id),
    }))
  }

  onChangeSearch = event => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(each =>
        each.websiteName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()),
      ),
      search: event.target.value,
    }))
  }

  renderTopContainer = () => {
    const {websiteName, userName, password} = this.state

    return (
      <div className="PM-top-Container">
        <form className="inputs-container" onSubmit={this.onAddPassword}>
          <h1 className="input-head">Add New Password</h1>
          <div className="input-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
              alt="website"
              className="input-box-image"
            />
            <input
              type="text"
              placeholder="Enter Website"
              className="inputs"
              value={websiteName}
              onChange={this.onWebsiteChange}
            />
          </div>
          <div className="input-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
              alt="username"
              className="input-box-image"
            />
            <input
              type="text"
              placeholder="Enter Username"
              className="inputs"
              value={userName}
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="input-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
              alt="password"
              className="input-box-image"
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="inputs"
              value={password}
              onChange={this.onPasswordChange}
            />
          </div>

          <button className="add-button" type="submit">
            Add
          </button>
        </form>

        <div className="input-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt=" password manager"
            className=" password-manager-image"
          />
        </div>
      </div>
    )
  }

  renderBottomContainer = () => {
    const {passwordsList, passwordHidden, search} = this.state
    const noOfPasswords = passwordsList.length
    const passwordExists = noOfPasswords !== 0

    return (
      <div className="PM-bottom-Container">
        <div className="password-head-container ">
          <div className="counter">
            <h1 className="password-text">Your Passwords</h1>
            <p className="span">{noOfPasswords} </p>
          </div>
          <div className="input-box search-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="input-box-image"
            />
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={search}
              onChange={this.onChangeSearch}
            />
          </div>
        </div>
        <hr />
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="checkbox"
            className=""
            onClick={this.onTogglePasswords}
          />
          <label htmlFor="checkbox">Show Passwords</label>
        </div>
        {passwordExists && (
          <ul className="password-items-container">
            {passwordsList.map(each => (
              <Password
                details={each}
                key={each.id}
                passwordHidden={passwordHidden}
                deleteAPassword={this.deleteAPassword}
              />
            ))}
          </ul>
        )}
        {!passwordExists && (
          <div className="empty-passwords-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-password-img"
            />
            <p className="no-password">No Passwords</p>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        {this.renderTopContainer()}
        {this.renderBottomContainer()}
      </div>
    )
  }
}

export default PasswordManager
