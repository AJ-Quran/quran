import Choose from '../../../../../../components/Choose/Choose'

import { loadLocal } from '../../../../../../js/db/localStorage'
import { changeTheme } from '../../../../../../js/utils/theme'

import './ThemeArea.css'

export default function ThemeArea() {
  const { theme } = loadLocal('quran').settings

  return (
    <>
      <div className="con_bg_dr pd_tb_none theme_choose_area">
        <Choose axe="x" iOption={theme || 'auto'}>
          <div
            className="df_f_ce theme_btn"
            option="light"
            onClick={() => changeTheme('light')}
          >
            <span className="material-symbols-outlined fz_normal">
              light_mode
            </span>
          </div>
          <div
            className="df_f_ce theme_btn"
            option="auto"
            onClick={() => changeTheme('auto')}
          >
            <span className="material-symbols-outlined fz_normal">devices</span>
          </div>
          <div
            className="df_f_ce theme_btn"
            option="dark"
            onClick={() => changeTheme('dark')}
          >
            <span className="material-symbols-outlined fz_normal">
              dark_mode
            </span>
          </div>
        </Choose>
      </div>
    </>
  )
}
