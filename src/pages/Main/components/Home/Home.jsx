import { useEffect, useRef, useState } from 'react'

import ReadArea from '../Quran/ReadArea/ReadArea'
import HomeWelcome from './components/HomeWelcome/HomeWelcome'
import HomeFacts from './components/HomeFacts/HomeFacts'
import HomeAboutUs from './components/HomeAboutUs/HomeAboutUs'
import HomeFeedback from './components/HomeFeedback/HomeFeedback'

import { load } from '../../../../js/db/db'

import './Home.css'

export default function Home({ surahI, setSurahI }) {
  const homePage = useRef()
  const scrollBtns = useRef()
  const [pageHeight, setPageHeight] = useState(0)
  const [people, setPeople] = useState([])
  const aboutUsI = 2

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
    checkPeopleArea(direction)
  }

  function checkPeopleArea(direction, dontCheck) {
    if (people.length > 0) return
    if (dontCheck) return loadData()

    let { scrollTop } = homePage.current
    if (direction === 'up') scrollTop -= pageHeight
    if (direction === 'down') scrollTop += pageHeight

    if (
      pageHeight * aboutUsI <= scrollTop &&
      scrollTop < pageHeight * (aboutUsI + 1)
    ) {
      loadData()
    }
  }

  async function loadData() {
    const data = await load(`dev/people`)
    setPeople(data)
  }

  function scrollDotBtn(e) {
    const btn = e.target
    if (btn.classList.contains('active')) return

    if (btn.classList.contains('scroll_dot_btn')) {
      const index = Array.from(scrollBtns.current.children).indexOf(btn)

      if (index === aboutUsI) checkPeopleArea('', true)
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

  return (
    <>
      <div className="h_100 home_page" ref={homePage} onWheel={wheel}>
        <HomeWelcome setSurahI={setSurahI} />
        <HomeFacts />
        <HomeAboutUs />
        <HomeFeedback />
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
      {surahI.surah > 0 && <ReadArea surahI={surahI} setSurahI={setSurahI} />}
    </>
  )
}
