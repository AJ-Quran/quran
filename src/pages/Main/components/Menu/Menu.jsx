import { useRef } from 'react'

import Button from '../../../../components/Button/Button'
import Avatar from '../Account/components/utils/Avatar'
import Choose from '../../../../components/Choose/Choose'

import './Menu.css'

export default function Menu({ setActievPage }) {
  const menu = useRef(null)

  function activeClick(btn) {
    const button = btn.target.querySelector('button')
    const option = button.getAttribute('option')
    setActievPage(option)
  }

  return (
    <div className="menu_area list_x">
      <div className="menu_con list_y df_jc_ce" ref={menu}>
        <Choose className="df_jc_sb" axe="y">
          <Button className="active" option="home" onClick={activeClick}>
            <span className="material-symbols-outlined">home</span>
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
        <div className="social_media df_f_ce">
          <a
            href="https://github.com/AJ-Quran"
            rel="noreferrer"
            className="con_bg_df con_ha df_f_ce"
          >
            <i className="fa-brands fa-github fz_big"></i>
          </a>
        </div>
      </div>
      <div className="line_y"></div>
    </div>
  )
}
