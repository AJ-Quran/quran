import { useEffect, useState } from 'react'

import AccountDataNotFound from './components/AccountDataNotFound/AccountDataNotFound'
import AccountDataMain from './components/AccountDataMain/AccountDataMain'
import AccountDataEditing from './components/AccountDataEditing/AccountDataEditing'

import { loadLocal } from '../../../../../../js/db/localStorage'
import { getAccount } from '../../../../../../js/account/account'

import './AccountData.css'

export default function AccountData() {
  const [account, setAccount] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    type: 'error',
    show: false,
  })

  useEffect(() => {
    const username = loadLocal('quran').accounts.active
    async function loadAccount() {
      const account = await getAccount(username)
      setAccount(account)
    }
    loadAccount()
  }, [saving])

  if (account === null) return <AccountDataNotFound />
  if (editing)
    return (
      <AccountDataEditing
        account={account}
        saving={saving}
        message={message}
        setEditing={setEditing}
        setSaving={setSaving}
        setMessage={setMessage}
      />
    )

  return (
    <AccountDataMain
      account={account}
      message={message}
      setMessage={setMessage}
      setEditing={setEditing}
    />
  )
}
