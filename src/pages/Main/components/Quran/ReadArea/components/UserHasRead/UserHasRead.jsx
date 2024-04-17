import Button from '../../../../../../../components/Button/Button'

import { readDone } from '../../util/readDone'

import './UserHasRead.css'

export default function UserHasRead({ surahI, setSurahI }) {
  async function close() {
    await readDone(surahI, setSurahI)
  }

  return (
    <>
      <div className="user_has_read_area df_f_ce ayahs_area list_y">
        <div className="list_y">
          <div className="list_x user_has_read_txt">
            <div className="txt_gradient">You have read</div>
            <div>🎉</div>
          </div>
          <div className="line_x_small"></div>
        </div>
        <Button
          className="con_bd_cl con_bg_gradient con_ha bd_btn list_x df_f_ce"
          onClick={close}
        >
          <span className="material-symbols-outlined fz_normal">menu_book</span>
          <span>
            Back to <b>Quran</b>
          </span>
        </Button>
      </div>
    </>
  )
}
