import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import Navbar from '../Navbar'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {nav: false, book: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.RenderBookDetails()
  }

  RenderBookDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.book_details.id,
        authorName: data.book_details.author_name,
        coverPic: data.book_details.cover_pic,
        title: data.book_details.title,
        aboutBook: data.book_details.about_book,
        rating: data.book_details.rating,
        readStatus: data.book_details.read_status,
        aboutAuthor: data.book_details.about_author,
      }
      this.setState({
        book: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeNav = () => {
    this.setState(prev => ({nav: !prev.nav}))
  }

  RetryRender = () => {
    this.setState({book: []}, this.RenderBookDetails)
  }

  renderLoadingView = () => (
    <div className="book-details-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height="50" width="50" />
    </div>
  )

  renderSlickView = () => {
    const {book} = this.state
    const {
      title,
      coverPic,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = book
    return (
      <div className="book-details-render-card">
        <div className="img-container">
          <img src={coverPic} className="details-img" alt={title} />
          <div className="content-container">
            <h1 className="book-heading">{title}</h1>
            <p className="book-para">{authorName}</p>
            <div className="rating">
              <p className="book-para">Avg Rating </p>
              <BsFillStarFill className="star" />
              <p className="book-para">{rating}</p>
            </div>
            <div className="rating">
              <p className="book-para">Status: </p>
              <pre className="book-status"> {readStatus}</pre>
            </div>
          </div>
        </div>
        <hr className="hr" />
        <div className="about-details">
          <h1 className="details-about">About Author</h1>
          <p className="details-about-para">{aboutAuthor}</p>
          <h1 className="details-about">About Book</h1>
          <p className="details-about-para">{aboutBook}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView RetryRender={this.RetryRender} />

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSlickView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {nav} = this.state
    const popup = nav ? `no-nav` : null
    return (
      <div>
        <Header onChangeNav={this.onChangeNav} />
        {nav && <Navbar onChangeNav={this.onChangeNav} />}
        <div className={`book-details-container ${popup}`}>
          <div className="book-details-card">
            <div className="book-details-inner-card">{this.renderAll()}</div>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetails
