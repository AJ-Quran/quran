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
        <HomeDots
          scroll={scroll}
          scrollBtns={scrollBtns}
          removeActiveDot={removeActiveDot}
          pageHeight={pageHeight}
        />
      </div>
      {surahI.surah > 0 && <ReadArea surahI={surahI} setSurahI={setSurahI} />}
    </>
  )
}
