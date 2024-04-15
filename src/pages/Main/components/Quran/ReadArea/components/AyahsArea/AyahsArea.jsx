import Button from '../../../../../../../components/Button/Button'
import ProgressBar from '../ProgressBar/ProgressBar'

import { floor } from '../../../../../../../js/math/number'
import { progressPercent } from '../../../../../../../js/math/percent'
import { wait } from '@testing-library/user-event/dist/utils'

import './AyahsArea.css'

export default function AyahsArea({ arAyahs, engAyahs, surahI, setSurahI }) {
  const progress = progressPercent(surahI.ayah, arAyahs?.length)

  if (progress === 100) done()

  async function done() {
    await wait(100)
    setSurahI({ ...surahI, surah: 0 })
  }

  return (
    <div className="ayahs_area">
      <div className="list_y">
        <div className="ayahs_area_info list_y mar_ce">
          <div className="list_y_small">
            <ProgressBar value={surahI.ayah} max={arAyahs?.length} />
            <div className="df_jc_sb fz_small">
              <div>
                {surahI.ayah}/{arAyahs?.length}
              </div>
              <div>{floor(progress)}%</div>
            </div>
          </div>
          <div className="df_jc_sb df_ai_ce_child list_x">
            <Button
              disabled={surahI.ayah === 0}
              className="bd_btn list_x"
              onClick={() => setSurahI({ ...surahI, ayah: surahI.ayah - 1 })}
            >
              <span className="material-symbols-outlined fz_normal">
                chevron_left
              </span>
              <span>Back</span>
            </Button>
            <Button
              className="con_bg_gradient con_ha"
              onClick={() => setSurahI({ ...surahI, surah: 0 })}
            >
              <span>I'm done</span>
            </Button>
            <Button
              disabled={surahI.ayah === arAyahs?.length}
              className="bd_btn list_x"
              onClick={() => setSurahI({ ...surahI, ayah: surahI.ayah + 1 })}
            >
              <span>Next</span>
              <span className="material-symbols-outlined fz_normal">
                chevron_right
              </span>
            </Button>
          </div>
        </div>
        {surahI.ayah < arAyahs?.length && (
          <div className="list_y">
            <div className="con_bg_df ayahs_text_area df_f_ce">
              <p className="txt_ar w_100">{arAyahs[surahI.ayah]?.text}</p>
            </div>
            <div className="con_bg_df ayahs_text_area df_f_ce ayahs_eng_area">
              <p className="w_100">{engAyahs[surahI.ayah]?.text}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}