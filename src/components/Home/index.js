import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Header from '../Header'
import Footer from '../Footer'
import Navbar from '../Navbar'
import FailureView from '../FailureView'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {nav: false, topRated: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.RenderTopRated()
  }

  RenderTopRated = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.books.map(each => ({
          id: each.id,
          authorName: each.author_name,
          coverPic: each.cover_pic,
          title: each.title,
        }))
        this.setState({
          topRated: formattedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeNav = () => {
    this.setState(prev => ({nav: !prev.nav}))
  }

  RetryRender = () => {
    this.setState({topRated: []}, this.RenderTopRated)
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height="50" width="50" />
    </div>
  )

  renderSlickView = () => {
    const {topRated} = this.state
    return (
      <Slider {...settings}>
        {topRated.map(each => {
          const {id, title, authorName, coverPic} = each
          return (
            <Link to={`/books/${id}`} key={id} className="link">
              <div className="slick-item" key={authorName}>
                <div className="slick-img-container">
                  <img
                    className="slick-logo-image"
                    src={coverPic}
                    alt={title}
                  />
                </div>
                <h1 className="slick-heading">{title}</h1>
                <p className="slick-para">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
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
        <Header stat="home" onChangeNav={this.onChangeNav} />
        {nav && <Navbar onChangeNav={this.onChangeNav} />}
        <div className={`Home-container ${popup}`}>
          <div className="context">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-para">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="link">
              <button type="button" className="find-books-btn">
                Find Books
              </button>
            </Link>
          </div>
          <div className="slick-container">
            <div className="slick-heading-container">
              <h1 className="top-rated">Top Rated Books</h1>
              <Link to="/shelf" className="link">
                <button type="button" className="Desktop-find-books-btn">
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderAll()}
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Home
