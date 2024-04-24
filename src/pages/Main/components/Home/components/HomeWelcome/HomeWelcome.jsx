import Button from '../../../../../../components/Button/Button'

import { loadLocal } from '../../../../../../js/db/localStorage'
import { openLastReadSurah } from '../../../Quran/components/List/util/openSurah'

export default function HomeWelcome({ setSurahI }) {
  const hasAccount = loadLocal('quran').accounts.active

  return (
    <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
      <div className="list_y df_ai_ce two_blur_balls">
        <b className="main_big_text">
          <span className="txt_gradient">AJ Quran</span>
        </b>
        <div className="txt_opa">
          The Quran - Explore and collaborate on the holy book of Islam. 📖✨
        </div>
      </div>
      {!hasAccount && (
        <div className="con warning_account_msg list_y_big">
          <div className="list_y">
            <div className="list_y df_ai_ce fz_big txt_yellow">
              <span className="material-symbols-outlined warning_icon">
                warning
              </span>
              <b className="fz_big">Warning</b>
            </div>
            <div className="line_x_small"></div>
          </div>
          <div className="list_y_small df_ai_ce">
            <p>
              We will not <b className="txt_yellow">synce</b> your data.
            </p>
            <p>
              You can <b className="txt_yellow">lost</b> them if you change your
              device.
            </p>
          </div>
          <div className="list_x">
            <div
              className="con_bg_gradient con_ha list_x df_f_ce bd_ra_big w_100"
              onClick={() => (window.location.href = 'account/signup')}
            >
              <span className="material-symbols-outlined fz_normal">
                person_add
              </span>
              <span>Sign up</span>
            </div>
            <Button
              className="bd_btn list_x df_f_ce bd_ra_big w_100"
              onClick={() => (window.location.href = 'account/login')}
            >
              <span className="material-symbols-outlined fz_normal">login</span>
              <span>Log in</span>
            </Button>
          </div>
        </div>
      )}
      <div className="facts">
        <div
          className="con_bg_gradient main_btn active_bg_anim active"
          onClick={() => openLastReadSurah(setSurahI)}
        >
          <div className="con_bg_dr con_ha facts_bg df_f_ce">
            <b className="txt_gradient">Read Quran</b>
          </div>
        </div>
      </div>
    </div>
  )
}
