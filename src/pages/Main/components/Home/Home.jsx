import { useEffect, useRef, useState } from 'react'

import ReadArea from '../Quran/ReadArea/ReadArea'
import HomeWelcome from './components/HomeWelcome/HomeWelcome'
import HomeFacts from './components/HomeFacts/HomeFacts'
import HomeAboutUs from './components/HomeAboutUs/HomeAboutUs'
import HomeFeedback from './components/HomeFeedback/HomeFeedback'
import HomeSubcscribe from './components/HomeSubcscribe/HomeSubcscribe'
import HomeDots from './components/HomeDots/HomeDots'

import { deviceIsPhone } from '../../../../js/utils/device'

import './Home.css'

export default function Home({ surahI, setSurahI }) {
  const homePage = useRef()
  const scrollBtns = useRef()
  const [activePage, setActivePage] = useState(0)
  const [pageHeight, setPageHeight] = useState(0)
  const isPhone = deviceIsPhone()

  useEffect(() => {
    const height = homePage.current?.querySelector('.scroll_area').clientHeight
    setPageHeight(height)
  }, [])

  function scroll(direction) {
    const scrollSize = homePage.current.scrollTop % pageHeight || 0

    if (direction === 'up') {
      if (scrollSize === 0) homePage.current.scrollTop -= pageHeight
      if (scrollSize > 0) homePage.current.scrollTop -= scrollSize
      setActivePage(getIndex(activePage - 1, scrollBtns.current.children))
    }

    if (direction === 'down') {
      if (scrollSize === 0) homePage.current.scrollTop += pageHeight
      if (scrollSize > 0) homePage.current.scrollTop += scrollSize
      setActivePage(getIndex(activePage + 1, scrollBtns.current.children))
    }

    scrollDotActive(direction)
  }

  function getIndex(i, array) {
    const max = array.length - 1

    return Math.min(Math.max(i, 0), max)
  }

  function scrollDotActive(direction) {
    const { children } = scrollBtns.current

    if (direction === 'up' && activePage === 0) return
    if (direction === 'down' && activePage === children.length - 1) return

    removeActiveDot()

    if (direction === 'up') children[activePage - 1].classList.add('active')
    if (direction === 'down') children[activePage + 1].classList.add('active')
  }

  function removeActiveDot() {
    const activeDot = scrollBtns.current.querySelector('.active')
    activeDot.classList.remove('active')
  }

  let touchYStart
  function touchStart(e) {
    touchYStart = e.touches[0].clientY
  }

  function touchMove(e) {
    const scrollVal = 80

    const { clientY } = e.touches[0]
    const difY = clientY - touchYStart

    if (difY < -scrollVal) handleScroll('down')
    if (difY > scrollVal) handleScroll('up')
  }

  function handleScroll(direction) {
    scroll(direction)
    scrollDotActive(direction)
  }

  return (
    <>
      <div
        className={`h_100 home_page ${!isPhone ? 'scroll_y' : ''}`}
        ref={homePage}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
      >
        <HomeWelcome setSurahI={setSurahI} />
        <HomeFacts />
        <HomeAboutUs />
        <HomeFeedback />
        <HomeSubcscribe
          removeActiveDot={removeActiveDot}
          setActivePage={setActivePage}
          scrollBtns={scrollBtns}
        />
        {isPhone && (
          <HomeDots
            scroll={scroll}
            scrollDotActive={scrollDotActive}
            removeActiveDot={removeActiveDot}
            setActivePage={setActivePage}
            scrollBtns={scrollBtns}
            pageHeight={pageHeight}
          />
        )}
      </div>
      {surahI.surah > 0 && <ReadArea surahI={surahI} setSurahI={setSurahI} />}
    </>
  )
}
