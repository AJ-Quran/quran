import React, { useEffect, useRef, useState } from 'react'

import Button from '../../../../../../components/Button/Button'
import Input from '../../../../../../components/Input/Input'
import Choose from '../../../../../../components/Choose/Choose'
import Loading from '../../../../../../components/Loading/Loading'
import Message from '../../../../../../components/Message/Message'
import Avatar from '../utils/Avatar'

import { loadLocal } from '../../../../../../js/db/localStorage'
import {
  getAccount,
  editUser,
  logout as dbLogout,
  deleteAccount as dbDeleteAccount,
} from '../../../../../../js/account/account'
import { getData } from '../../../../../../js/utils/form'
import { msgData } from '../../../../../../js/utils/message'
import { elText } from '../../../../../../js/utils/copy'
import Alert from '../../../../../../components/Alert/Alert'
import { load } from '../../../../../../js/db/db'

function AccountData() {
  const form = useRef(null)
  const nameRef = useRef(null)
  const usernameRef = useRef(null)
  const logoutRef = useRef(null)
  const deleteRef = useRef(null)
  const [account, setAccount] = useState(false)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [logingout, setLogingout] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState({
    text: '',
    type: 'error',
    show: false,
  })

  useEffect(() => {
    const username = loadLocal('quran').accounts.active
    async function loadAccount() {
      setAccount(await getAccount(username))
    }
    loadAccount()
  }, [saving])

  async function saveChanges() {
    setSaving(true)

    const formData = getData(form.current)
    if (!formData.ok) {
      setMessage({ msg: formData.msg, type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setSaving(false)
      return
    }

    const username = loadLocal('quran').accounts.active
    const editedData = await editUser(username, formData)

    if (!editedData.ok) {
      setMessage({ msg: editedData.msg, type: editedData.msgType, show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setSaving(false)
      return
    }

    setSaving(false)
    setEditing(false)

    setMessage({ msg: 'Changes saved', type: 'success', show: true })
    setTimeout(
      () => setMessage({ ...message, show: false }),
      msgData.time * 1000
    )
  }

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
    const dbPassword = await load(`accounts/${username}/user/password`)
    const password = logoutRef.current?.value

    const correct = dbPassword === password

    if (!correct) {
      setMessage({ msg: 'Password is not matching', type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    dbLogout(username)
  }

  async function deleteAccount() {
    const username = loadLocal('quran').accounts.active
    const dbPassword = await load(`accounts/${username}/user/password`)
    const password = deleteRef.current?.value

    const correct = dbPassword === password

    if (!correct) {
      setMessage({ msg: 'Password is not matching', type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    dbDeleteAccount(username)
  }

  if (account === null) return null

  if (editing) {
    return (
      <div className="df_f_ce">
        <div className="con_bd_cl loading_area list_y main_w_small" ref={form}>
          <Message show={message.show} type={message.type}>
            {message.msg}
          </Message>
          <div className="df_jc_sb df_ai_ce">
            <b>Edit</b>
            <div className="list_x">
              <Button
                className="list_x_small red"
                onClick={() => setDeleting(true)}
              >
                <span className="material-symbols-outlined fz_normal">
                  delete
                </span>
                <span>Delete</span>
              </Button>
              <Button
                className="list_x_small"
                onClick={() => setEditing(false)}
              >
                <span className="material-symbols-outlined fz_normal">
                  close
                </span>
                <span>Close</span>
              </Button>
            </div>
          </div>
          <div className="list_x df_ai_ce">
            <Avatar style={{ height: '70px', fontSize: '35px' }}></Avatar>
            <div className="list_y w_100 df_ai_ce_child">
              <div className="list_x">
                <span className="material-symbols-outlined">person</span>
                <Input
                  type="text"
                  label="Name"
                  value={account?.name}
                  maxLength="20"
                  autoFocus
                />
              </div>
              <div className="list_x">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
                <Input
                  type="text"
                  label="Username"
                  value={account?.username}
                  maxLength="20"
                />
              </div>
            </div>
          </div>
          <Choose axe="x" label="Gender" iOption={account?.gender}>
            <div className="list_x df_ai_ce" option="male">
              <span className="material-symbols-outlined fz_normal gender_male">
                male
              </span>
              <div>Male</div>
            </div>
            <div className="list_x df_ai_ce" option="female">
              <span className="material-symbols-outlined fz_normal gender_female">
                female
              </span>
              <div>Female</div>
            </div>
          </Choose>
          <Button
            className="df_f_ce list_x medium"
            colorful="true"
            onClick={saveChanges}
          >
            <span className="material-symbols-outlined fz_big">
              check_circle
            </span>
            <span>Save changes</span>
          </Button>
          {saving && <Loading size="210px">Saving</Loading>}
        </div>
        {deleting && (
          <Alert title="Delete account" onHide={() => setDeleting(false)}>
            <Input
              ref={deleteRef}
              type="password"
              label="Password"
              maxLength="20"
              autoFocus
              areaProps={{ className: 'con_bg_dr' }}
            />
            <div>
              You should <b>reload</b> the page to apply changes.
            </div>
            <div className="df_jc_end">
              <Button className="list_x red" onClick={deleteAccount}>
                <span className="material-symbols-outlined fz_normal">
                  delete
                </span>
                <span>Delete</span>
              </Button>
            </div>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="df_ai_ce list_y">
        <div className="w_max loading_area df_jc_sb list_y bd_ra">
          <Message show={message.show} type={message.type}>
            {message.msg}
          </Message>
          <div className="list_y df_f_ce">
            <Avatar style={{ width: '80px', fontSize: '40px' }}></Avatar>
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
          {!account && <Loading size="120px">Main account</Loading>}
        </div>
        {account && (
          <div className="list_y df_jc_ce df_jc_ce_child">
            <Button
              className="list_x_small medium"
              onClick={() => setEditing(true)}
            >
              <span className="material-symbols-outlined fz_normal">edit</span>
              <span>Edit</span>
            </Button>
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
              onClick={() => (window.location.href = 'account/login')}
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
          <Input
            ref={logoutRef}
            type="password"
            label="Password"
            maxLength="20"
            autoFocus
            areaProps={{ className: 'con_bg_dr' }}
          />
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

export default AccountData
