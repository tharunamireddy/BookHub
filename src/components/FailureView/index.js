import './index.css'

const FailureView = props => {
  const {RetryRender} = props
  const retry = () => {
    RetryRender()
  }
  return (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dwch0edff/image/upload/v1716383110/Group_7522_md4jhs.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-para">Something went wrong, Please try again.</p>
      <button type="button" onClick={retry} className="retry-button">
        Try Again
      </button>
    </div>
  )
}
export default FailureView
