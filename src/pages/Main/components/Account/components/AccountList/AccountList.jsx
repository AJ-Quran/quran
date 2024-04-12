import React, { useEffect, useState } from 'react'

import Avatar from '../utils/Avatar'
import Loading from '../../../../../../components/Loading/Loading'
import Button from '../../../../../../components/Button/Button'
import Alert from '../../../../../../components/Alert/Alert'

import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'
import { changeAccount } from '../../../../../../js/account/account'

export default function AccountList() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [switchAcc, setSwitchAcc] = useState({ switch: false, account: {} })

  useEffect(() => {
    const dataArr = []
    async function loadData() {
      const { usernames } = loadLocal('quran').accounts
      const { active } = loadLocal('quran').accounts

      for (let i = 0; i < usernames.length; i++) {
        if (usernames[i] === active) continue

        const data = await load(`accounts/${usernames[i]}/user`)
        dataArr.push(data)
      }
      setAccounts(dataArr)
      setLoading(false)
    }
    loadData()
  }, [])

  function changeAcc() {
    changeAccount(switchAcc.account?.username)
  }

  return (
    <>
      {accounts.length === 0 && null}
      {accounts.length > 0 && (
        <div className="df_f_ce list_y">
          {accounts.map((account, i) => (
            <div
              key={i}
              className="con_bd_df con_ha df_ai_ce_child df_jc_sb"
              username={accounts[i]?.username}
              onClick={() =>
                setSwitchAcc({ switch: true, account: accounts[i] })
              }
              style={{ width: '500px' }}
            >
              <div className="list_x fz_small">
                <Avatar
                  style={{ height: 30, fontSize: '14px' }}
                  letter={account?.name[0]}
                />
                <span>{account?.name}</span>
              </div>
              <div>
                <span className="material-symbols-outlined fz_big">
                  change_circle
                </span>
              </div>
            </div>
          ))}
          {switchAcc.switch && (
            <Alert
              title="Switch account"
              onHide={() => setSwitchAcc({ ...switchAcc, switch: false })}
            >
              <div className="df_ai_ce list_x fz_small">
                <Avatar
                  style={{ height: 40, fontSize: '14px' }}
                  letter={switchAcc.account?.name[0]}
                />
                <div className="list_y">
                  <b>{switchAcc.account?.name}</b>
                  <span className="txt_opa fz_small">
                    @{switchAcc.account?.username}
                  </span>
                </div>
              </div>
              <div>
                You should <b>reload</b> the page to apply changes.
              </div>
              <div className="df_jc_end">
                <Button className="list_x" colorful="true" onClick={changeAcc}>
                  <span className="material-symbols-outlined fz_normal">
                    change_circle
                  </span>
                  <span>Switch</span>
                </Button>
              </div>
            </Alert>
          )}
        </div>
      )}
      {loading && (
        <div className="df_jc_ce">
          <div className="con_bd_cl loading_area" style={{ width: '500px' }}>
            <Loading size="50px">Accounts list</Loading>
          </div>
        </div>
      )}
    </>
  )
}
