import AccountData from './components/AccountData/AccountData'
import AccountList from './components/AccountList/AccountList'

function Account() {
  return (
    <div className="list_y">
      <AccountData />
      <div className="line_x"></div>
      <AccountList />
    </div>
  )
}

export default Account
