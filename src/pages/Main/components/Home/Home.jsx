import { useRef, useState } from 'react'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import Textarea from '../../../../components/Textarea/Textarea'
import Message from '../../../../components/Message/Message'

import { getAccount } from '../../../../js/account/account'
import { loadLocal } from '../../../../js/db/localStorage'
import { getData } from '../../../../js/utils/form'
import { msgData } from '../../../../js/utils/message'

import './Home.css'
import { send } from '../../../../js/utils/feedback'

export default function Home() {
  const form = useRef()
  const nameInput = useRef()
  const emailInput = useRef()
  const msgTextarea = useRef()
  const homePage = useRef()
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })

  function scrollDown() {
    const scrollHeight =
      homePage.current.querySelector('.scroll_area').clientHeight
    homePage.current.scrollTop = scrollHeight
  }

  async function autoFill() {
    if (nameInput.current.value) return

    const username = loadLocal('quran').accounts.active
    const account = await getAccount(username)

    const nameLabel = nameInput.current.parentElement.querySelector('label')
    nameInput.current.value = account.name
    nameLabel.classList.add('active')
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
    <>
      <div className="h_100 scroll_y home_page" ref={homePage}>
        <Message show={message.show} type={message.type}>
          {message.msg}
        </Message>
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">AJ Quran</span>
            </b>
            <div className="txt_opa">
              The Quran - Explore and collaborate on the holy book of Islam.
              📖✨
            </div>
          </div>
          <div className="list_y df_ai_ce">
            <div className="list_x facts">
              <div className="con_bg_gradient">
                <div className="con_bg_dr facts_bg"></div>
                <div className="facts_con df_jc_sb">
                  <b className="">Surahs</b>
                  <div className="df_ai_end">
                    <div></div>
                    <div>144</div>
                  </div>
                </div>
              </div>
              <div className="con_bg_gradient">
                <div className="con_bg_dr facts_bg"></div>
                <div className="facts_con df_jc_sb">
                  <b className="">Ayahs</b>
                  <div className="df_ai_end">
                    <div></div>
                    <div>6 236</div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div></div>
            <div
              className="con_bg_df con_ha welcome_down_btn df_f_ce"
              onClick={scrollDown}
            >
              <span className="material-symbols-outlined">expand_more</span>
            </div>
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
                <span className="material-symbols-outlined fz_normal">
                  draw
                </span>
                <span>Auto Fill</span>
              </div>
            </div>
            <div ref={form} className="list_y">
              <div className="list_x">
                <Input ref={nameInput} type="text" label="Name" />
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
          <div className="line_x"></div>
          <div className="footer pd_small list_y">
            <div className="list_x social_media df_f_ce">
              <a
                href="https://github.com/AJ-Quran"
                rel="noreferrer"
                className="con_bg_df con_ha df_f_ce"
              >
                <i className="fa-brands fa-github fz_big"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
