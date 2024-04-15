import React, { useEffect, useState } from 'react'

import Menu from './components/Menu/Menu'
import Settings from './components/Settings/Settings'
import Quran from './components/Quran/Quran'
import Home from './components/Home/Home'
import Account from './components/Account/Account'

import useTitle from '../../hooks/useTitle'

import { txtCapitalizeFirstLetter } from '../../js/utils/txt'

import './Main.css'

function Main() {
  const [activePage, setActievPage] = useState('quran')
  const [surahI, setSurahI] = useState({ surah: 0, ayah: 1 })
  const [title, setTitle] = useTitle(activePage)
  const pages = {
    home: <Home surahI={surahI} setSurahI={setSurahI} />,
    quran: <Quran surahI={surahI} setSurahI={setSurahI} />,
    account: <Account />,
    settings: <Settings />,
  }

  useEffect(() => {
    const newTitle = txtCapitalizeFirstLetter(activePage)
    setTitle(newTitle)
  }, [activePage])

  return (
    <div className="main_area">
      <div className="menu">
        <Menu activePage={activePage} setActievPage={setActievPage} />
      </div>
      <div className="main">{pages[activePage]}</div>
    </div>
  )
}

export default Main
