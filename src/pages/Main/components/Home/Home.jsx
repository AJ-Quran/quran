import { useEffect, useRef, useState } from 'react'

import ReadArea from '../Quran/ReadArea/ReadArea'
import HomeWelcome from './components/HomeWelcome/HomeWelcome'
import HomeFacts from './components/HomeFacts/HomeFacts'
import HomeAboutUs from './components/HomeAboutUs/HomeAboutUs'
import HomeFeedback from './components/HomeFeedback/HomeFeedback'
import HomeSubcscribe from './components/HomeSubcscribe/HomeSubcscribe'
import HomeDots from './components/HomeDots/HomeDots'

import './Home.css'

export default function Home({ surahI, setSurahI }) {
  const homePage = useRef()
  const scrollBtns = useRef()
  const [activePage, setActivePage] = useState(0)
  const [pageHeight, setPageHeight] = useState(0)

  useEffect(() => {
    const height = homePage.current?.querySelector('.scroll_area').clientHeight
    setPageHeight(height)
  }, [])

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') scroll('up')
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') scroll('down')
    }

    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [activePage])

  function getIndex(i, array) {
    const max = array.length - 1

    return Math.min(Math.max(i, 0), max)
  }

  function scroll(direction) {
    const scrollSize = homePage.current.scrollTop % pageHeight || 0

    if (direction === 'up') {
      if (scrollSize === 0) homePage.current.scrollTop -= pageHeight
      if (scrollSize > 0) homePage.current.scrollTop -= scrollSize
      setActivePage(getIndex(activePage - 1, scrollBtns.current.children))
    }

    if (direction === 'down') {
      homePage.current.scrollTop += pageHeight - scrollSize
      setActivePage(getIndex(activePage + 1, scrollBtns.current.children))
    }

    scrollDotActive(direction)
  }

  function scrollDotActive(direction) {
    const { children } = scrollBtns.current

    removeActiveDot()

    if (direction === 'up' && children[activePage - 1])
      children[activePage - 1].classList.add('active')
    if (direction === 'down' && children[activePage + 1])
      children[activePage + 1].classList.add('active')
  }

  function removeActiveDot() {
    const activeDot = scrollBtns.current.querySelector('.active')
    activeDot.classList.remove('active')
  }

  function handleScroll(direction) {
    scroll(direction)
    scrollDotActive(direction)
  }

  function wheel(e) {
    if (e.deltaY < 0) handleScroll('up')
    if (e.deltaY > 0) handleScroll('down')
  }

  let touchYStart
  function touchStart(e) {
    touchYStart = e.touches[0].clientY
  }

  function touchMove(e) {
    const { clientY } = e.touches[0]

    if (touchYStart < clientY) handleScroll('up')
    if (touchYStart > clientY) handleScroll('down')
  }

  return (
    <>
      <div
        className="h_100 home_page"
        ref={homePage}
        onWheel={wheel}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
      >
        <HomeWelcome setSurahI={setSurahI} />
        <HomeFacts />
        <HomeAboutUs />
        <HomeFeedback />
        <HomeSubcscribe
          removeActiveDot={removeActiveDot}
          scrollBtns={scrollBtns}
        />
        <HomeDots
          scroll={scroll}
          scrollDotActive={scrollDotActive}
          removeActiveDot={removeActiveDot}
          scrollBtns={scrollBtns}
          pageHeight={pageHeight}
        />
      </div>
      {surahI.surah > 0 && <ReadArea surahI={surahI} setSurahI={setSurahI} />}
    </>
  )
}
