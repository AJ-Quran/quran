import AccountData from './components/AccountData/AccountData'
import AccountCreate from './components/AccountCreate/AccountCreate'
import AccountList from './components/AccountList/AccountList'

import { loadLocal } from '../../../../js/db/localStorage'

export default function Account() {
  const hasAccount = loadLocal('quran').accounts.active

  return (
    <div className="list_y">
      {hasAccount && <AccountData />}
      {!hasAccount && <AccountCreate />}
      <div className="line_x"></div>
      <AccountList />
    </div>
  )
}
