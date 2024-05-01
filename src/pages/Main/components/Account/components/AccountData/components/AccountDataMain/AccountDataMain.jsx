import { useEffect, useRef, useState } from 'react'

import Message from '../../../../../../../../components/Message/Message'
import Avatar from '../../../utils/Avatar'
import Alert from '../../../../../../../../components/Alert/Alert'
import Button from '../../../../../../../../components/Button/Button'
import Loading from '../../../../../../../../components/Loading/Loading'

import { loadLocal } from '../../../../../../../../js/db/localStorage'
import { getAccount, logout } from '../../../../../../../../js/account/account'
import { elText } from '../../../../../../../../js/utils/copy'
import { msgData } from '../../../../../../../../js/utils/message'
import { changeHref } from '../../../../../../../../js/utils/href'

export default function AccountDataMain({
  account,
  message,
  setMessage,
  setEditing,
}) {
  const nameRef = useRef(null)
  const usernameRef = useRef(null)
  const [bigProfilePic, setBigProfilePic] = useState(false)
  const [logingout, setLogingout] = useState(false)
  const [openProfilePic, setOpenProfilePic] = useState(false)

  useEffect(() => {
    const username = loadLocal('quran').accounts.active
    async function loadAccount() {
      const account = await getAccount(username)

      if (account?.img?.img) setOpenProfilePic(true)
    }
    loadAccount()
  }, [])

  function copy(elRef) {
    const msg = elText(elRef)

    setMessage({ ...msg, type: 'success', show: true })
    setTimeout(
      () => setMessage({ ...message, show: false }),
      msgData.time * 1000
    )
  }

  async function logoutAccount() {
    const username = loadLocal('quran').accounts.active
    logout(username)
  }

  return (
    <>
      <div className="df_ai_ce list_y">
        <div className="w_max loading_area df_jc_sb list_y bd_ra">
          <Message show={message.show} type={message.type}>
            {message.msg}
          </Message>
          <div className="list_y df_f_ce">
            <Avatar
              style={{ width: '80px', fontSize: '40px' }}
              onClick={() => openProfilePic && setBigProfilePic(true)}
            ></Avatar>
            {bigProfilePic && (
              <Alert onHide={() => setBigProfilePic(false)} simple="true">
                <div
                  className="df_f_ce"
                  onClick={() => setBigProfilePic(false)}
                >
                  <Avatar
                    style={{ width: '400px', fontSize: '200px' }}
                  ></Avatar>
                </div>
              </Alert>
            )}
            <div className="list_y df_jc_ce_child">
              <div className="fz_big">
                <b ref={nameRef} className="name" onClick={() => copy(nameRef)}>
                  {account?.name}
                </b>
              </div>
              <div
                className="txt_opa fz_small w_100"
                onClick={() => copy(usernameRef)}
              >
                @<span ref={usernameRef}>{account?.username}</span>
              </div>
            </div>
          </div>
          {!account && <Loading>Main account</Loading>}
        </div>
        {account && (
          <div className="list_y df_jc_ce df_jc_ce_child">
            {account?.password && (
              <Button
                className="list_x_small medium"
                onClick={() => setEditing(true)}
              >
                <span className="material-symbols-outlined fz_normal">
                  edit
                </span>
                <span>Edit</span>
              </Button>
            )}
            <Button
              className="list_x_small medium red"
              onClick={() => setLogingout(true)}
            >
              <span className="material-symbols-outlined fz_normal">
                logout
              </span>
              <span>Log out</span>
            </Button>
            <Button
              className="list_x_small medium"
              colorful="true"
              onClick={() => changeHref('account/login')}
            >
              <span className="material-symbols-outlined fz_normal">
                add_circle
              </span>
              <span>Add account</span>
            </Button>
          </div>
        )}
      </div>
      {logingout && (
        <Alert title="Log out" onHide={() => setLogingout(false)}>
          <div>
            You should <b>reload</b> the page to apply changes.
          </div>
          <div className="df_jc_end">
            <Button className="list_x red" onClick={logoutAccount}>
              <span className="material-symbols-outlined fz_normal">
                logout
              </span>
              <span>Log out</span>
            </Button>
          </div>
        </Alert>
      )}
    </>
  )
}
