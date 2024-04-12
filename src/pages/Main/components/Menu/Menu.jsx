import { useRef } from 'react'
import Button from '../../../../components/Button/Button'
import Avatar from '../Account/components/utils/Avatar'

import './Menu.css'
import Choose from '../../../../components/Choose/Choose'

function Menu({ setActievPage }) {
  const menu = useRef(null)

  function activeClick(btn) {
    const button = btn.target.querySelector('button')
    const option = button.getAttribute('option')
    setActievPage(option)
  }

  return (
    <div className="menu_area list_x">
      <div className="menu_con list_y" ref={menu}>
        <Choose className="df_jc_sb" axe="y">
          <Button className="active" option="home" onClick={activeClick}>
            <span className="material-symbols-outlined">home</span>
          </Button>
          <Button option="search" onClick={activeClick}>
            <span className="material-symbols-outlined">search</span>
          </Button>
          <Button option="quran" onClick={activeClick}>
            <span className="material-symbols-outlined">menu_book</span>
          </Button>
          <Button option="account" onClick={activeClick}>
            <Avatar style={{ width: '40px', fontSize: '15px' }}></Avatar>
          </Button>
          <Button option="settings" onClick={activeClick}>
            <span className="material-symbols-outlined">settings</span>
          </Button>
        </Choose>
      </div>
      <div className="line_y"></div>
    </div>
  )
}

export default Menu
