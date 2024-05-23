import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import NavButtons from '../NavButtons'
import Card from '../Card'
import Header from '../Header'
import Footer from '../Footer'
import Navbar from '../Navbar'
import FailureView from '../FailureView'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    nav: false,
    book: [],
    status: 'ALL',
    label: 'All',
    search: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.RenderBookShelves()
  }

  RenderBookShelves = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {status, search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${status}&search=${search}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.books.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
        rating: each.rating,
        readStatus: each.read_status,
      }))
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
    this.setState({book: []}, this.RenderBookShelves)
  }

  onChangeInput = event => {
    this.setState({search: event.target.value})
  }

  getSearchResults = () => {
    const {search} = this.state
    this.setState({search}, this.RenderBookShelves)
  }

  changeStatus = (id, value) => {
    this.setState({status: id, label: value}, this.RenderBookShelves)
  }

  renderLoadingView = () => (
    <div className="book-shelf-loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height="50" width="50" />
    </div>
  )

  renderBooksView = () => {
    const {book, status, label, search} = this.state
    return (
      <div className="book-shelves-content">
        <div className="book-shelves-nav">
          <ul className="book-shelve-list">
            <h1 className="book-shelves-heading">Bookshelves</h1>
            {bookshelvesList.map(each => (
              <NavButtons
                list={each}
                key={each.id}
                activeTab={status === each.value}
                changeStatus={this.changeStatus}
              />
            ))}
          </ul>
        </div>
        <div className="All-books-container">
          <div className="search-header">
            <h1 className="books-status-heading">{label} Books</h1>
            <div className="search-container">
              <input
                onChange={this.onChangeInput}
                placeholder="Search"
                type="search"
                value={search}
                className="input"
              />
              <button
                type="button"
                className="search"
                onClick={this.getSearchResults}
                testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>
          </div>
          <div className="list">
            {book.length > 0 ? (
              <>
                {book.map(each => (
                  <Card key={each.title} item={each} />
                ))}
              </>
            ) : (
              <div className="no-items">
                <img
                  src="https://res.cloudinary.com/dwch0edff/image/upload/v1716458300/Asset_1_1_1_arapz1.png"
                  alt="no books"
                />
                <p>Your search for {search} did not find any matches.</p>
              </div>
            )}
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView RetryRender={this.RetryRender} />

  renderAll = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksView()
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
        <Header stat="shelf" onChangeNav={this.onChangeNav} />
        {nav && <Navbar onChangeNav={this.onChangeNav} />}
        <div className={`book-shelves-container ${popup}`}>
          <div className="book-shelves-card">{this.renderAll()}</div>
        </div>
      </div>
    )
  }
}

export default Bookshelves
