import { changeHref } from '../../js/utils/href'

import './WrongPath.css'

export default function WrongPath() {
  return (
    <>
      <div className="wrong_path_area df_f_ce h_100 two_blur_balls">
        <div className="list_y df_ai_ce">
          <div className="con_bd_df con_bg_dr list_y df_ai_ce warning_con">
            <span className="material-symbols-outlined txt_yellow warning_icon">
              warning
            </span>
            <b className="fz_big">Page was not found</b>
            <div>
              Back to{' '}
              <span className="txt_gradient" onClick={changeHref}>
                Safe Page
              </span>
            </div>
          </div>
          <div
            className="con_bg_gradient con_ha list_x df_f_ce w_100"
            onClick={changeHref}
          >
            <span className="material-symbols-outlined">home</span>
            <span>Home Page</span>
          </div>
        </div>
      </div>
    </>
  )
}
