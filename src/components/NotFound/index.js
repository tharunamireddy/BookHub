import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://res.cloudinary.com/dwch0edff/image/upload/v1716383109/Group_7484_majozr.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="link">
      <button type="button" className="not-found-button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
