import { loadLocal } from '../../../../../../../../js/db/localStorage'
import { changeHref } from '../../../../../../../../js/utils/href'

export default function AccountDataNotFound() {
  const reasonsArray = [
    'Account deleted due to inactivity',
    'Mistaken deletion during maintenance',
    'Technical error during creation',
    'Flagged for suspicious activity',
    'Data corruption or loss incident',
    'System upgrade complications',
    'Intentional removal for policy violation',
    'Account archived during restructuring',
    'Inadvertent loss during data transfer',
    'Security breach precautions',
  ]

  return (
    <>
      <div className="list_y mar_ce df_ai_ce">
        <div className="list_x fz_big">
          <span className="txt_red">There is no account with</span>
          <b>@{loadLocal('quran').accounts.active}</b>
        </div>
        <div className="list_x">
          <div
            className="con_bg_gradient con_ha list_x df_ai_ce"
            onClick={() => changeHref('account/signup')}
          >
            <span className="material-symbols-outlined fz_normal">
              person_add
            </span>
            <span>Sign up</span>
          </div>
          <div
            className="con_bg_df con_ha list_x df_ai_ce"
            onClick={() => changeHref('account/login')}
          >
            <span className="material-symbols-outlined fz_normal">login</span>
            <span>Log in</span>
          </div>
        </div>
        <div className="df_fd_cl w_100 df_ai_ce">
          <div className="title">Reasons</div>
          <div className="line_x"></div>
        </div>
        <div className="reasons_area">
          {reasonsArray.map((reason, i) => {
            return (
              <div className="con_bg_df" key={i}>
                {reason}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
