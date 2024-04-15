import { useEffect, useState } from 'react'

import Button from '../../../../../../../components/Button/Button'

import { toggleSurah } from '../../../../../../../js/db/quran/savedSurahs'
import { loadLocal } from '../../../../../../../js/db/localStorage'
import { load } from '../../../../../../../js/db/db'

import './SurahName.css'

export default function SurahName({ surahI, surahData }) {
  const [savedI, setSavedI] = useState([])

  async function saveSurah(e) {
    const btn = e.target
    const icon = btn.firstChild

    icon.classList.toggle('fill')
    toggleSurah(surahI)
  }

  useEffect(() => {
    async function loadData() {
      const username = loadLocal('quran').accounts.active
      const data = await load(`accounts/${username}/quran/saved`)
      if (data) {
        const indexes = data?.map((i) => i.surah).sort((a, b) => a - b)
        setSavedI(indexes)
      }
    }
    loadData()
  }, [])

  return (
    <div className="con_bg_gradient con_h df_jc_ce surah_name">
      <div className="df_ai_ce list_y">
        <b>
          {surahData?.number}. {surahData?.englishName}
        </b>
        <div>{surahData?.englishNameTranslation}</div>
        <div className="line_x_small"></div>
        <div className="txt_opa fz_small list_x">
          <div>{surahData?.revelationType}</div>
          <div>•</div>
          <div>{surahData?.numberOfAyahs} verses</div>
        </div>
      </div>
      <Button
        className="save_surah_btn con_ha bg_none h_max"
        onClick={saveSurah}
      >
        <span
          className={`material-symbols-outlined ${
            savedI.length > 0 && savedI.includes(surahI.surah) ? 'fill' : ''
          }`}
        >
          bookmark
        </span>
      </Button>
    </div>
  )
}
