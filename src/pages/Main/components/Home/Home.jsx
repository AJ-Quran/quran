import { useEffect, useRef, useState } from 'react'

import Input from '../../../../components/Input/Input'
import Button from '../../../../components/Button/Button'
import Textarea from '../../../../components/Textarea/Textarea'
import Message from '../../../../components/Message/Message'
import ReadArea from '../Quran/ReadArea/ReadArea'

import { getAccount } from '../../../../js/account/account'
import { loadLocal } from '../../../../js/db/localStorage'
import { getData } from '../../../../js/utils/form'
import { msgData } from '../../../../js/utils/message'
import { send } from '../../../../js/utils/feedback'
import { wait } from '@testing-library/user-event/dist/utils'

import './Home.css'

export default function Home({ surahI, setSurahI }) {
  const form = useRef()
  const nameInput = useRef()
  const emailInput = useRef()
  const msgTextarea = useRef()
  const homePage = useRef()
  const scrollBtns = useRef()
  const [pageHeight, setPageHeight] = useState(0)
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })

  useEffect(() => {
    const height = homePage.current?.querySelector('.scroll_area').clientHeight
    setPageHeight(height)
  }, [])

  function scroll(direction) {
    const scrollSize = homePage.current.scrollTop % pageHeight

    if (direction === 'up') {
      if (scrollSize === 0) homePage.current.scrollTop -= pageHeight
      if (scrollSize > 0) homePage.current.scrollTop -= scrollSize
    }

    if (direction === 'down') {
      homePage.current.scrollTop += pageHeight - scrollSize
    }

    scrollDotActive(direction)
  }

  function scrollDotBtn(e) {
    const btn = e.target
    if (btn.classList.contains('active')) return

    if (btn.classList.contains('scroll_dot_btn')) {
      const index = Array.from(scrollBtns.current.children).indexOf(btn)

      removeActiveDot()
      btn.classList.add('active')

      homePage.current.scrollTop = index * pageHeight
    }
  }

  function scrollDotActive(direction) {
    const { children } = scrollBtns.current

    let scrollI = homePage.current.scrollTop / pageHeight
    scrollI = Math.floor(scrollI)

    removeActiveDot()

    if (direction === 'up') {
      children[scrollI].classList.add('active')
    }

    if (direction === 'down') {
      children[scrollI + 1].classList.add('active')
    }
  }

  function scrollDotActiveI(index) {
    removeActiveDot()

    const { children } = scrollBtns.current
    children[index].classList.add('active')
  }

  function removeActiveDot() {
    const activeDot = scrollBtns.current.querySelector('.active')
    activeDot.classList.remove('active')
  }

  async function autoFill() {
    if (nameInput.current.value) return
    const nameParent = nameInput.current.parentElement
    nameParent.classList.add('active')

    const username = loadLocal('quran').accounts.active
    const account = await getAccount(username)
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

  function wheel(e) {
    if (e.deltaY < 0) {
      scroll('up')
      scrollDotActive('up')
    }

    if (e.deltaY > 0) {
      scroll('down')
      scrollDotActive('down')
    }
  }

  function readQuran() {
    setSurahI(1)
  }

  return (
    <>
      <div className="h_100 home_page" ref={homePage} onWheel={wheel}>
        <Message show={message.show} type={message.type}>
          {message.msg}
        </Message>
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">AJ Quran</span>
            </b>
            <div className="txt_opa">
              The Quran - Explore and collaborate on the holy book of Islam.
              📖✨
            </div>
          </div>
          <div className="facts">
            <div
              className="con_bg_gradient main_btn active_bg_anim active"
              onClick={readQuran}
            >
              <div className="con_bg_dr con_ha facts_bg df_f_ce">
                <b className="txt_gradient">Read Quran</b>
              </div>
            </div>
          </div>
        </div>
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">Facts</span>
            </b>
            <div className="txt_opa">
              Discover the secrets of the Quran ✨ - Start your enlightening
              journey! 📖
            </div>
          </div>
          <div className="list_y df_ai_ce">
            <div className="list_x facts">
              <div className="con_bg_gradient">
                <div className="con_bg_dr facts_bg"></div>
                <div className="facts_con df_jc_sb">
                  <b>Surahs</b>
                  <div className="df_ai_end">
                    <div></div>
                    <div>144</div>
                  </div>
                </div>
              </div>
              <div className="con_bg_gradient">
                <div className="con_bg_dr facts_bg"></div>
                <div className="facts_con df_jc_sb">
                  <b>Ayahs</b>
                  <div className="df_ai_end">
                    <div></div>
                    <div>6 236</div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">About us</span>
            </b>
            <div className="txt_opa">
              We are the developers of AJ Quran 🧑‍💻📖
            </div>
          </div>
          <div className="list_y df_ai_ce">
            <div className="list_x facts about_us_area">
              <div className="con_bg_gradient active_bg_anim active">
                <div className="con_bg_dr facts_bg list_y df_ai_ce">
                  <div className="avatar df_f_ce">
                    <img
                      src="https://avatars.githubusercontent.com/u/100585930?s=400&u=b1b25433ac6308a722ecb4d6a0343b65b8abf2a3&v=4"
                      alt="CEO"
                    />
                    <span>AJ</span>
                  </div>
                  <b className="fz_big">Akbar Jorayev</b>
                  <div className="txt_opa fz_small">CEO • Founder</div>
                  <div className="social_media list_x">
                    <a
                      href="https://github.com/akbarjorayev"
                      rel="noreferrer"
                      className="con_bg_df con_ha df_f_ce"
                    >
                      <i className="fa-brands fa-github fz_big"></i>
                    </a>
                    <a
                      href="https://t.me/akbarjorayevAJ"
                      rel="noreferrer"
                      className="con_bg_df con_ha df_f_ce"
                    >
                      <i className="fa-brands fa-telegram fz_big"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="txt_opa fz_mono mission_txt">
            Our mission is to enable access to the <b>Quran</b> for all,
            anytime, anywhere
          </div>
          <div></div>
        </div>
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">Feedback</span>
            </b>
            <div className="txt_opa">
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
                  <span className="material-symbols-outlined fz_normal">
                    draw
                  </span>
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
        <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
          <div className="list_y df_ai_ce two_blur_balls">
            <b className="main_big_text">
              <span className="txt_gradient">Subcscribe</span>
            </b>
            <div className="txt_opa">
              Do not lose hope - Follow us for more! 😊
            </div>
          </div>
          <div className="list_y df_ai_ce">
            <div className="list_x subscribe_area fz_big">
              <a
                href="https://github.com/AJ-Quran"
                rel="noreferrer"
                className="con_bg_dr github"
              >
                <div className="df_fd_cl df_jc_sb h_100">
                  <i className="fa-brands fa-github fz_big"></i>
                  <b className="df_jc_end">GitHub</b>
                </div>
              </a>
              <a
                href="https://t.me/AJ_Quran"
                rel="noreferrer"
                className="con_bg_dr telegram"
              >
                <div className="df_fd_cl df_jc_sb h_100">
                  <i className="fa-brands fa-telegram fz_big"></i>
                  <b className="df_jc_end">Telegram</b>
                </div>
              </a>
            </div>
          </div>
          <div className="facts">
            <div
              className="con_bg_gradient main_btn active_bg_anim active"
              onClick={() => {
                homePage.current.scrollTop = 0
                scrollDotActiveI(0)
              }}
            >
              <div className="con_bg_dr con_ha facts_bg df_f_ce">
                <div className="list_x df_ai_ce">
                  <span className="material-symbols-outlined fz_normal">
                    arrow_upward
                  </span>
                  <span>Explore</span>
                </div>
              </div>
            </div>
          </div>
          <div className="txt_opa fz_mono all_rights_txt">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </div>
        <div className="scroll_btns list_y df_ai_ce_child">
          <div
            className="con_bg_df con_ha up_down_btn df_f_ce"
            onClick={() => scroll('up')}
          >
            <span className="material-symbols-outlined">expand_less</span>
          </div>
          <div ref={scrollBtns} className="list_y" onClick={scrollDotBtn}>
            <div className="con_bg_df con_ha scroll_dot_btn active"></div>
            <div className="con_bg_df con_ha scroll_dot_btn"></div>
            <div className="con_bg_df con_ha scroll_dot_btn"></div>
            <div className="con_bg_df con_ha scroll_dot_btn"></div>
            <div className="con_bg_df con_ha scroll_dot_btn"></div>
          </div>
          <div
            className="con_bg_df con_ha up_down_btn df_f_ce"
            onClick={() => scroll('down')}
          >
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </div>
      </div>
      {surahI > 0 && <ReadArea index={surahI} setSurahI={setSurahI} />}
    </>
  )
}
