import logo from '../../../../../../img/logo/bookLight.svg'

import './LastRead.css'

export default function LastRead({ surah, verse }) {
  return (
    <>
      <div className="con_bg_gradient con_ha last_read list_y df_jc_sb">
        <div className="list_x">
          <span className="material-symbols-outlined fz_big">menu_book</span>
          <div>Last read</div>
        </div>
        <div className="list_y">
          <b>{surah}</b>
          <div className="fz_small txt_opa">{verse} verses</div>
        </div>
        <img className="logo" src={logo} alt="Quran" />
      </div>
    </>
  )
}
