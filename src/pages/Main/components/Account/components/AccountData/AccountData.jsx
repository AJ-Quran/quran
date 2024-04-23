import { useEffect, useRef, useState } from 'react'

import Button from '../../../../../../components/Button/Button'
import Input from '../../../../../../components/Input/Input'
import Choose from '../../../../../../components/Choose/Choose'
import Loading from '../../../../../../components/Loading/Loading'
import Message from '../../../../../../components/Message/Message'
import Avatar from '../utils/Avatar'
import AvatarToEdit from '../utils/AvatarToEdit'
import Alert from '../../../../../../components/Alert/Alert'
import Tooplit from '../../../../../../components/Tooplit/Tooplit'

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
import { load } from '../../../../../../js/db/db'
import { getImgBlob } from '../../../../../../js/utils/img'

import './AccountData.css'

export default function AccountData() {
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
  const [showTooplit, setShowTooplit] = useState(false)
  const [tooplitPos, setTooplitPos] = useState({ x: 0, y: 0 })
  const [profileImg, setProfileImg] = useState('')
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

  useEffect(() => {
    if (profileImg) return

    setProfileImg(account?.img?.img)
  }, [editing])

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

    const userNewData = { ...formData, img: { img: profileImg } }
    const editedData = await editUser(username, userNewData)

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

  function showUpTooplit(e) {
    const { clientX: x, clientY: y } = e

    setTooplitPos({ x, y })
    setShowTooplit(true)
  }

  function clickFileInput(e) {
    const fileInput = e.target?.querySelector('input[type="file"]')
    fileInput?.click()
  }

  async function uploadFile(e) {
    const fileInput = e.target
    if (!fileInput) return

    const file = fileInput.files[0]
    const blob = await getImgBlob(file)

    setProfileImg(blob)
    setShowTooplit(false)

    fileInput.value = ''
  }

  if (account === null)
    return (
      <>
        <div className="list_y mar_ce df_ai_ce">
          <div className="list_x fz_big">
            <span className="txt_red">There is no account with</span>
            <b>@{loadLocal('quran').accounts.active}</b>
          </div>
          <div className="list_x">
            <div
              className="con_bg_gradient con_ha list_x df_ai_ce"
              onClick={() => (window.location.href = '/account/signup')}
            >
              <span className="material-symbols-outlined fz_normal">
                person_add
              </span>
              <span>Sign up</span>
            </div>
            <div
              className="con_bg_df con_ha list_x df_ai_ce"
              onClick={() => (window.location.href = '/account/login')}
            >
              <span className="material-symbols-outlined fz_normal">login</span>
              <span>Log in</span>
            </div>
          </div>
          <div className="df_fd_cl w_100 df_ai_ce">
            <div className="title">Reasons</div>
            <div className="line_x"></div>
          </div>
          <div className="reasons_area">
            <div className="con_bg_df">
              1. Account deleted due to inactivity.
            </div>
            <div className="con_bg_df">
              2. Mistaken deletion during maintenance.
            </div>
            <div className="con_bg_df">3. Technical error during creation.</div>
            <div className="con_bg_df">4. Flagged for suspicious activity.</div>
            <div className="con_bg_df">
              5. Data corruption or loss incident.
            </div>
            <div className="con_bg_df">6. System upgrade complications.</div>
            <div className="con_bg_df">
              7. Intentional removal for policy violation.
            </div>
            <div className="con_bg_df">
              8. Account archived during restructuring.
            </div>
            <div className="con_bg_df">
              9. Inadvertent loss during data transfer.
            </div>
            <div className="con_bg_df">10. Security breach precautions.</div>
          </div>
        </div>
      </>
    )

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
            <AvatarToEdit
              style={{ height: '70px', fontSize: '35px' }}
              img={profileImg}
            >
              <div className="avatar_edit_btns">
                <div
                  className="con_bg_df con_ha bd_ra_50 df_f_ce"
                  onClick={showUpTooplit}
                >
                  <span className="material-symbols-outlined">edit</span>
                </div>
              </div>
            </AvatarToEdit>
            {showTooplit && (
              <Tooplit onHide={() => setShowTooplit(false)} pos={tooplitPos}>
                <div className="list_y_small">
                  <div
                    className="con_ha list_x df_ai_ce txt_main"
                    onClick={clickFileInput}
                  >
                    <span className="material-symbols-outlined fz_normal">
                      cloud_upload
                    </span>
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={uploadFile} />
                  </div>
                  {profileImg && (
                    <div
                      className="con_ha list_x df_ai_ce txt_red"
                      onClick={() => {
                        setProfileImg('')
                        setShowTooplit(false)
                      }}
                    >
                      <span className="material-symbols-outlined fz_normal">
                        delete
                      </span>
                      <span>Delete</span>
                    </div>
                  )}
                </div>
              </Tooplit>
            )}
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
          {saving && <Loading>Saving</Loading>}
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
          {!account && <Loading>Main account</Loading>}
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
