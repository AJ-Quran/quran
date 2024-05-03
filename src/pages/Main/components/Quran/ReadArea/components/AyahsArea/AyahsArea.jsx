import ProgressBar from '../ProgressBar/ProgressBar'
import AyahsAreaButtons from './components/AyahsAreaButtons/AyahsAreaButtons'

import { ceil } from '../../../../../../../js/math/number'
import { progressPercent } from '../../../../../../../js/math/percent'
import { deviceIsPhone } from '../../../../../../../js/utils/device'
import { loadLocal } from '../../../../../../../js/db/localStorage'

import './AyahsArea.css'

export default function AyahsArea({ arAyahs, engAyahs, surahI, setSurahI }) {
  const ayahsLen = arAyahs?.length || 0
  const { ayah } = surahI

  const localData = loadLocal('quran')
  const fontSizes = {
    ar: localData.settings.fontSize.arabic,
    en: localData.settings.fontSize.english,
  }

  const progress = progressPercent(ayah, arAyahs?.length)
  const isPhone = deviceIsPhone()

  return (
    <div className="ayahs_area list_y df_jc_sb h_100">
      <div className="list_y">
        <div className="ayahs_area_info list_y mar_ce">
          <div className="list_y_small">
            <ProgressBar value={ayah} max={ayahsLen} />
            <div className="df_jc_sb fz_small">
              <div>
                {ayah}/{ayahsLen}{' '}
                <b className="txt_red">{ayahsLen - ayah} left</b>
              </div>
              <div>{ceil(progress) || 0}%</div>
            </div>
          </div>
          {!isPhone && (
            <AyahsAreaButtons surahI={surahI} setSurahI={setSurahI} />
          )}
        </div>
        {ayah < ayahsLen && (
          <div className="list_y">
            <div className="con_bg_df ayahs_text_area df_f_ce">
              <p
                className="txt_ar w_100"
                style={{ fontSize: `${fontSizes.ar}px` }}
              >
                {arAyahs[ayah]?.text}
              </p>
            </div>
            <div className="con_bg_df ayahs_text_area df_f_ce ayahs_eng_area">
              <p className="w_100" style={{ fontSize: `${fontSizes.en}px` }}>
                {engAyahs[ayah]?.text}
              </p>
            </div>
          </div>
        )}
      </div>
      {isPhone && <AyahsAreaButtons surahI={surahI} setSurahI={setSurahI} />}
    </div>
  )
}
