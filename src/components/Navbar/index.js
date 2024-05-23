import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdCloseCircle} from 'react-icons/io'

import './index.css'

const Navbar = props => {
  const {onChangeNav} = props

  const clickedHam = () => {
    onChangeNav()
  }
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-logout-container">
      <Link to="/" className="link">
        <li className="nav-item">Home</li>
      </Link>
      <Link to="/shelf" className="link">
        <li className="nav-item">Bookshelves</li>
      </Link>
      <button type="button" className="nav-logout-button" onClick={logout}>
        Logout
      </button>
      <button type="button" className="nav-button icon" onClick={clickedHam}>
        <IoMdCloseCircle />
      </button>
    </div>
  )
}

export default withRouter(Navbar)
