import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import Choose from '../../../components/Choose/Choose'
import Loading from '../../../components/Loading/Loading'

import * as FORM from '../../../js/utils/form'
import { getLocalAccounts, signup } from '../../../js/account/account'
import { msgData } from '../../../js/utils/message'
import useTitle from '../../../hooks/useTitle'

import '../Account.css'
import React, { useRef, useState } from 'react'

const Message = React.lazy(() => import('../../../components/Message/Message'))

function Signup() {
  const [signing, setSigning] = useState(false)
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })
  const form = useRef(null)
  useTitle('Sign up')

  async function handleSignup() {
    setSigning(true)
    const formData = FORM.getData(form?.current)
    if (!formData.ok) {
      setMessage({ msg: formData.msg, type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setSigning(false)
      return
    }

    const signupData = await signup(formData)
    if (!signupData.ok) {
      setMessage({
        msg: signupData.msg,
        type: signupData.msgType || 'error',
        show: true,
      })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setSigning(false)
      return
    }
  }

  const hasAccount = getLocalAccounts().length > 0

  return (
    <div className="h_100 df_f_ce">
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div className="list_y loading_area bd_ra">
        <div className="account_area list_y">
          <div className="df_ai_ce df_jc_sb">
            <div className="title list_x df_ai_ce">
              <span className="material-symbols-outlined fz_normal">
                person_add
              </span>
              <span>Sign up</span>
            </div>
            <Button
              className="list_x d_ai_ce"
              onClick={() => (window.location.href = '/account/login')}
            >
              <span className="material-symbols-outlined fz_normal">login</span>
              <span>Log in</span>
            </Button>
          </div>
          <div className="line_x"></div>
          <div className="list_y" ref={form}>
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined">person</span>
              <Input type="text" label="Name" maxLength="20" autoFocus />
            </div>
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined">alternate_email</span>
              <Input type="text" label="Username" maxLength="20" />
            </div>
            <Choose axe="x" label="Gender">
              <Button className="list_x df_ai_ce" option="male">
                <span className="material-symbols-outlined fz_normal gender_male">
                  male
                </span>
                <div>Male</div>
              </Button>
              <Button className="list_x df_ai_ce" option="female">
                <span className="material-symbols-outlined fz_normal gender_female">
                  female
                </span>
                <div>Female</div>
              </Button>
            </Choose>
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined">vpn_key</span>
              <Input type="password" label="Password" maxLength="20" />
            </div>
            <Button
              className="medium list_x df_f_ce"
              colorful="true"
              onClick={handleSignup}
            >
              <span className="material-symbols-outlined fz_normal">
                person_add
              </span>
              <span>Sign up</span>
            </Button>
          </div>
        </div>
        {hasAccount && (
          <Button
            className="medium list_x df_f_ce"
            colorful="true"
            onClick={() => (window.location.href = '/')}
          >
            <span className="material-symbols-outlined fz_normal">home</span>
            <span>Main page</span>
          </Button>
        )}
        {signing && <Loading size="50px">Signing up</Loading>}
      </div>
    </div>
  )
}

export default Signup
