import { useState } from 'react'

import Message from '../../../../../../components/Message/Message'

import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'
import { getAccount } from '../../../../../../js/account/account'
import { msgData } from '../../../../../../js/utils/message'

export default function OptimizeApp() {
  const [optimizing, setOptimizing] = useState(false)
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })

  async function optimize() {
    setOptimizing(true)

    const localData = loadLocal('quran')
    const { usernames, active: activeUsername } = localData.accounts
    const newUsernames = []

    for (let i = 0; i < usernames.length; i++) {
      const account = await getAccount(usernames[i])
      if (account) newUsernames.push(usernames[i])
    }

    localData.accounts.usernames = newUsernames

    const activeAccount = await getAccount(activeUsername)
    if (!activeAccount) {
      if (newUsernames.length > 0) localData.accounts.active = newUsernames[0]
      if (newUsernames.length === 0) localData.accounts.active = ''
    }

    saveLocal('quran', localData)
    setOptimizing(false)

    setMessage({
      msg: 'App optimized',
      type: 'success',
      show: true,
    })
    setTimeout(
      () => setMessage({ ...message, show: false }),
      msgData.time * 1000
    )
  }

  return (
    <>
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div
        className="con_bg_df con_ha list_x df_ai_ce"
        onClick={optimize}
        disabled={optimizing}
      >
        <span className="material-symbols-outlined fz_normal">
          change_circle
        </span>
        <span>{optimizing ? 'Optimizing...' : 'Optimize app'}</span>
      </div>
    </>
  )
}
