import './index.css'

const Password = props => {
  const {details, passwordHidden, deleteAPassword} = props
  const {id, websiteName, password, userName} = details

  const onDelete = () => {
    deleteAPassword(id)
    console.log(websiteName)
  }

  return (
    <li className="password-item">
      <div className="icon-container">
        <p className="icon">S</p>
      </div>
      <div className="password-info">
        <p className="website-name">{websiteName}</p>
        <p className="website-name">{userName}</p>
        {passwordHidden && <p className="password">{password}</p>}
        {!passwordHidden && (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="password-img"
          />
        )}
      </div>
      <button type="button" className="delete-btn" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default Password
