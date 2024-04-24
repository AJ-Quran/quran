import { useEffect, useRef, useState } from 'react'

import ReadArea from '../Quran/ReadArea/ReadArea'
import HomeWelcome from './components/HomeWelcome/HomeWelcome'
import HomeFacts from './components/HomeFacts/HomeFacts'
import HomeAboutUs from './components/HomeAboutUs/HomeAboutUs'
import HomeFeedback from './components/HomeFeedback/HomeFeedback'
import HomeSubcscribe from './components/HomeSubcscribe/HomeSubcscribe'

import './Home.css'

export default function Home({ surahI, setSurahI }) {
  const homePage = useRef()
  const scrollBtns = useRef()
  const [pageHeight, setPageHeight] = useState(0)

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
      const index = [...scrollBtns.current.children].indexOf(btn)

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
        <HomeSubcscribe scrollDotActiveI={scrollDotActiveI} />
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
