import { useEffect, useState } from 'react'

import AccountDataNotFound from './components/AccountDataNotFound/AccountDataNotFound'
import AccountDataEditing from './components/AccountDataEditing/AccountDataEditing'
import AccountDataMain from './components/AccountDataMain/AccountDataMain'

import { loadLocal } from '../../../../../../js/db/localStorage'
import { getAccount } from '../../../../../../js/account/account'

import './AccountData.css'

export default function AccountData() {
  const [account, setAccount] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    type: 'default',
    show: false,
  })

  useEffect(() => {
    const username = loadLocal('quran').accounts.active
    async function loadData() {
      const data = await getAccount(username)
      setAccount(data)
    }
    loadData()
  }, [saving])

  useEffect(() => {
    setMessage({ ...message, show: false })
  }, [editing])

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
