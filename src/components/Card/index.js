import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const Card = props => {
  const {item} = props
  return (
    <Link to={`/books/${item.id}`} className="link">
      <div className="Card">
        <img src={item.coverPic} alt="img" className="Card-img" />
        <div className="Card-content">
          <h1 className="Card-title">{item.title}</h1>
          <p className="Card-para">{item.authorName}</p>
          <div className="rating">
            <p className="Card-para">Avg Rating </p>
            <BsFillStarFill className="star" />
            <p className="Card-para">{item.rating}</p>
          </div>
          <div className="rating">
            <p className="Card-para">Status : </p>
            <p className="Card-status"> {item.readStatus}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
