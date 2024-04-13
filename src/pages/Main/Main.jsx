import React, { useEffect, useState } from 'react'

import Menu from './components/Menu/Menu'
import Settings from './components/Settings/Settings'
import Search from './components/Search/Search'
import Quran from './components/Quran/Quran'
import Home from './components/Home/Home'
import Account from './components/Account/Account'

import useTitle from '../../hooks/useTitle'

import { txtCapitalizeFirstLetter } from '../../js/utils/txt'

import './Main.css'

const pages = {
  quran: <Quran />,
  search: <Search />,
  account: <Account />,
  settings: <Settings />,
}

function Main() {
  const [activePage, setActievPage] = useState('home')
  const [title, setTitle] = useTitle(activePage)

  useEffect(() => {
    const newTitle = txtCapitalizeFirstLetter(activePage)
    setTitle(newTitle)
  }, [activePage])

  return (
    <div className="main_area">
      <div className="menu">
        <Menu activePage={activePage} setActievPage={setActievPage} />
      </div>
      <div className="main">
        {activePage === 'home' && <Home setActievPage={setActievPage} />}
        {pages[activePage]}
      </div>
    </div>
  )
}

export default Main
