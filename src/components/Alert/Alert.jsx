import { useState } from 'react'

import Button from '../Button/Button'

import './Alert.css'

export default function Alert({ children, title, onHide: handeHide, bgNone }) {
  const [show, setShow] = useState(true)
  if (!show) return null

  function hide() {
    setShow(false)
    if (handeHide) handeHide()
  }

  return (
    <div className="alert_area df_f_ce">
      <div className="alert_bg bg_blur_theme" onClick={hide}></div>
      <div className={`alert_con list_y ${bgNone ? 'bg_none' : ''}`}>
        {title && (
          <div className="list_y">
            <div className="alert_con_top df_ai_ce df_jc_sb list_x">
              <div className="title">{title}</div>
              <Button className="red" onClick={hide}>
                <span className="material-symbols-outlined fz_normal">
                  close
                </span>
              </Button>
            </div>
            <div className="line_x"></div>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
