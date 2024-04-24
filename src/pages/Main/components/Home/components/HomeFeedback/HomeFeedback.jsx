import { useRef, useState } from 'react'

import Input from '../../../../../../components/Input/Input'
import Textarea from '../../../../../../components/Textarea/Textarea'
import Button from '../../../../../../components/Button/Button'
import Message from '../../../../../../components/Message/Message'

import { getData } from '../../../../../../js/utils/form'
import { msgData } from '../../../../../../js/utils/message'
import { send } from '../../../../../../js/utils/feedback'
import { wait } from '@testing-library/user-event/dist/utils'
import { getAccount } from '../../../../../../js/account/account'
import { loadLocal } from '../../../../../../js/db/localStorage'

export default function HomeFeedback() {
  const form = useRef()
  const nameInput = useRef()
  const emailInput = useRef()
  const msgTextarea = useRef()
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })

  async function autoFill() {
    if (nameInput.current.value) return

    const nameParent = nameInput.current.parentElement
    nameParent.classList.add('active')

    const username = loadLocal('quran').accounts.active
    if (!username) {
      nameParent.classList.remove('active')

      setMessage({
        msg: 'You do not have an account',
        type: 'warning',
        show: true,
      })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    const account = await getAccount(username)
    if (!account) {
      nameParent.classList.remove('active')

      setMessage({
        msg: 'Your account has been deleted',
        type: 'error',
        show: true,
      })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    await wait(1000)

    const nameLabel = nameParent.querySelector('label')

    nameInput.current.value = account.name

    nameLabel.classList.add('active')
    nameParent.classList.remove('active')
    nameInput.current.classList.remove('error')
  }

  async function sendFeedback() {
    const formData = getData(form.current)
    if (!formData.ok) {
      setMessage({ msg: formData.msg, type: 'error', show: true })
      setTimeout(
        () => setMessage({ ...message, show: false }),
        msgData.time * 1000
      )
      return
    }

    await send(formData.inputs)
    setMessage({
      msg: 'Feedback sent successfully!',
      type: 'success',
      show: true,
    })
    setTimeout(
      () => setMessage({ ...message, show: false }),
      msgData.time * 1000
    )

    msgTextarea.current.value = ''

    const textAreaLabel =
      msgTextarea.current.parentElement.querySelector('label')
    textAreaLabel.classList.remove('active')
  }

  return (
    <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div className="list_y df_ai_ce two_blur_balls">
        <b className="main_big_text">
          <span className="txt_gradient">Feedback</span>
        </b>
        <div className="txt_opa txt_wrap_b txt_alg_ce">
          Dive into the Quran - Your insights are valued! 😊📖
        </div>
      </div>
      <div className="list_y df_ai_ce">
        <div className="list_y main_w">
          <div className="list_x df_jc_sb">
            <b className="fz_big">Feedback</b>
            <div
              className="con_bg_gradient con_ha bd_ra_big list_x"
              onClick={autoFill}
            >
              <span className="material-symbols-outlined fz_normal">draw</span>
              <span>Auto Fill</span>
            </div>
          </div>
          <div ref={form} className="list_y">
            <div className="list_x">
              <Input
                ref={nameInput}
                type="text"
                label="Name"
                areaProps={{ className: 'active_bg_anim' }}
              />
              <Input ref={emailInput} type="text" label="Email" />
            </div>
            <Textarea ref={msgTextarea} label="Message" />
          </div>
          <Button
            className="medium list_x df_f_ce"
            colorful="true"
            onClick={sendFeedback}
          >
            <span className="material-symbols-outlined fz_normal">
              forward_to_inbox
            </span>
            <span>Send</span>
          </Button>
        </div>
        <div></div>
      </div>
    </div>
  )
}
