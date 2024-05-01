import { useEffect, useRef, useState } from 'react'

import Message from '../../../../../../../../components/Message/Message'
import Button from '../../../../../../../../components/Button/Button'
import Input from '../../../../../../../../components/Input/Input'
import Choose from '../../../../../../../../components/Choose/Choose'
import Loading from '../../../../../../../../components/Loading/Loading'
import AvatarToEdit from '../../../utils/AvatarToEdit'
import Alert from '../../../../../../../../components/Alert/Alert'
import Tooplit from '../../../../../../../../components/Tooplit/Tooplit'

import { deleteAccount as dbDeleteAccount } from '../../../../../../../../js/account/account'
import { getImgBlob } from '../../../../../../../../js/utils/img'
import { msgData } from '../../../../../../../../js/utils/message'
import { getData } from '../../../../../../../../js/utils/form'
import { loadLocal } from '../../../../../../../../js/db/localStorage'
import { editUser } from '../../../../../../../../js/account/account'
import { avatars } from '../../../utils/getAvatar'
import { load } from '../../../../../../../../js/db/db'

export default function AccountDataEditing({
  account,
  saving,
  message,
  setEditing,
  setSaving,
  setMessage,
}) {
  const form = useRef(null)
  const deleteRef = useRef(null)
  const [deleting, setDeleting] = useState(false)
  const [showTooplit, setShowTooplit] = useState(false)
  const [tooplitPos, setTooplitPos] = useState({ x: 0, y: 0 })
  const [profileImg, setProfileImg] = useState('')
  const profilePicLimit = 5 * 1024 * 1024

  useEffect(() => {
    setProfileImg(account?.img?.img)
  }, [])

  async function saveChanges() {
    setSaving(true)

    const formData = getData(form.current)
    if (!formData.ok) {
      setMessage({ msg: formData.msg, type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: true }),
        msgData.time * 1000
      )
      setSaving(false)
      return
    }

    const username = loadLocal('quran').accounts.active

    const userNewData = { ...formData, img: { img: profileImg } }
    const editedData = await editUser(username, userNewData)

    avatars.get(username).img = profileImg

    if (!editedData.ok) {
      setMessage({ msg: editedData.msg, type: editedData.msgType, show: true })
      setTimeout(
        () => setMessage({ ...message, show: true }),
        msgData.time * 1000
      )
      setSaving(false)
      return
    }

    setSaving(false)
    setEditing(false)

    setMessage({ msg: 'Changes saved', type: 'success', show: true })
    setTimeout(
      () => setMessage({ ...message, show: true }),
      msgData.time * 1000
    )
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
    if (file.size > profilePicLimit) {
      setMessage({ msg: 'Max file size is 5MB', type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    const blob = await getImgBlob(file)

    setProfileImg(blob)
    setShowTooplit(false)

    fileInput.value = ''
  }

  return (
    <div className="df_f_ce">
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div className="con_bd_cl loading_area list_y main_w_small" ref={form}>
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
            <Button className="list_x_small" onClick={() => setEditing(false)}>
              <span className="material-symbols-outlined fz_normal">close</span>
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
                className="con bg_blur_theme_more blur_ha bd_ra_50 df_f_ce"
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
              <span className="material-symbols-outlined">alternate_email</span>
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
          <span className="material-symbols-outlined fz_big">check_circle</span>
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