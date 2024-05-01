import { useRef, useState } from 'react'

import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import Loading from '../../../components/Loading/Loading'
import Message from '../../../components/Message/Message'

import * as FORM from '../../../js/utils/form'
import { login } from '../../../js/account/account'
import { msgData } from '../../../js/utils/message'
import useTitle from '../../../hooks/useTitle'
import { changeHref } from '../../../js/utils/href'

import '../Account.css'

export default function Login() {
  const [logging, setLogging] = useState(false)
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })
  const form = useRef(null)
  useTitle('Log in')

  async function handleLogin() {
    setLogging(true)
    const formData = FORM.getData(form?.current)
    if (!formData.ok) {
      setMessage({ msg: formData.msg, type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setLogging(false)
      return
    }

    const loginData = await login(formData)
    if (!loginData.ok) {
      setMessage({
        msg: loginData.msg,
        type: loginData.msgType || 'error',
        show: true,
      })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      setLogging(false)
      return
    }
  }

  return (
    <div className="h_100 df_f_ce">
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div className="list_y loading_area bd_ra">
        <div className="account_area list_y">
          <div className="df_ai_ce df_jc_sb">
            <div className="title list_x df_ai_ce">
              <span className="material-symbols-outlined fz_normal">login</span>
              <span>Log in</span>
            </div>
            <Button
              className="list_x df_ai_ce"
              onClick={() => changeHref('account/signup')}
            >
              <span className="material-symbols-outlined fz_normal">
                person_add
              </span>
              <span>Sign up</span>
            </Button>
          </div>
          <div className="line_x"></div>
          <div className="list_y" ref={form}>
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined">person</span>
              <Input type="text" label="Username" maxLength="20" autoFocus />
            </div>
            <div className="list_x df_ai_ce">
              <span className="material-symbols-outlined">vpn_key</span>
              <Input type="password" label="Password" maxLength="20" />
            </div>
            <Button
              className="medium list_x df_f_ce"
              colorful="true"
              onClick={handleLogin}
            >
              <span className="material-symbols-outlined fz_normal">login</span>
              <span>Log in</span>
            </Button>
          </div>
        </div>
        <Button
          className="medium list_x df_f_ce"
          colorful="true"
          onClick={() => changeHref('/')}
        >
          <span className="material-symbols-outlined fz_normal">home</span>
          <span>Main page</span>
        </Button>
        {logging && <Loading size="50px">Logging in</Loading>}
      </div>
    </div>
  )
}
