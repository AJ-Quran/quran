import ProgressBar from '../ProgressBar/ProgressBar'
import AyahsAreaButtons from './components/AyahsAreaButtons/AyahsAreaButtons'

import { ceil } from '../../../../../../../js/math/number'
import { progressPercent } from '../../../../../../../js/math/percent'

import './AyahsArea.css'

export default function AyahsArea({ arAyahs, engAyahs, surahI, setSurahI }) {
  const progress = progressPercent(surahI.ayah, arAyahs?.length)

  return (
    <div className="ayahs_area">
      <div className="list_y">
        <div className="ayahs_area_info list_y mar_ce">
          <div className="list_y_small">
            <ProgressBar value={surahI.ayah} max={arAyahs?.length || 0} />
            <div className="df_jc_sb fz_small">
              <div>
                {surahI.ayah}/{arAyahs?.length || 0}
              </div>
              <div>{ceil(progress) || 0}%</div>
            </div>
          </div>
          <AyahsAreaButtons surahI={surahI} setSurahI={setSurahI} />
        </div>
        {surahI.ayah < (arAyahs?.length || 0) && (
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
