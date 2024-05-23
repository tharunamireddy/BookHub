import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="footer-items">
      <button type="button" className="footer-icon-button">
        <FaGoogle className="footer-icons" />
      </button>
      <button type="button" className="footer-icon-button">
        <FaTwitter className="footer-icons" />
      </button>
      <button type="button" className="footer-icon-button">
        <FaInstagram className="footer-icons" />
      </button>
      <button type="button" className="footer-icon-button">
        <FaYoutube className="footer-icons" />
      </button>
    </div>
    <p className="footer-para">Contact us</p>
  </div>
)

export default Footer
