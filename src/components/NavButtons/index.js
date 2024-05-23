import './index.css'

const NavButtons = props => {
  const {list, changeStatus, activeTab} = props
  const activeButtons = () => {
    changeStatus(list.value, list.label)
  }
  const tabActive = activeTab ? `yes` : `no`
  return (
    <li className={`nav-li NB-item ${tabActive}`} onClick={activeButtons}>
      {list.label}
    </li>
  )
}

export default NavButtons
