import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {onChangeNav, stat} = props

  const clickedHam = () => {
    onChangeNav()
  }

  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const color = stat === 'home' ? `home` : `nav-item`
  const color2 = stat === 'shelf' ? `home` : `nav-item`
  return (
    <>
      <div className="Desktop-header-container">
        <Link to="/" className="link">
          <div className="header-logo-container">
            <img
              src="https://res.cloudinary.com/dwch0edff/image/upload/v1716218104/Group_7730_z8fzor.png"
              alt="website logo"
              className="header-website-login"
            />
            <h1 className="header-logo-heading">ook Hub</h1>
          </div>
        </Link>
        <div className="logout-container">
          <Link to="/" className="link">
            <li className={`${color}`}>Home</li>
          </Link>
          <Link to="/shelf" className="link">
            <li className={`${color2}`}>Bookshelves</li>
          </Link>
          <button type="button" className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="Mobile-header-container">
        <Link to="/" className="link">
          <div className="header-logo-container">
            <img
              src="https://res.cloudinary.com/dwch0edff/image/upload/v1716218104/Group_7730_z8fzor.png"
              alt="logo"
              className="header-website-login"
            />
            <h1 className="header-logo-heading">ook Hub</h1>
          </div>
        </Link>
        <button type="button" onClick={clickedHam} className="icon">
          <img
            src="https://res.cloudinary.com/dwch0edff/image/upload/v1716313612/icon_ydom32.png"
            alt="ham"
          />
        </button>
      </div>
    </>
  )
}
export default withRouter(Header)
