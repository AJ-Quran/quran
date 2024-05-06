import { useEffect, useState } from 'react'

import { toggleSurah } from '../../../../../../../js/db/quran/savedSurahs'
import { loadLocal } from '../../../../../../../js/db/localStorage'
import { load } from '../../../../../../../js/db/db'
import { readDone } from '../../util/readDone'

import './SurahName.css'

export default function SurahName({
  surahI,
  setSurahI,
  userHasRead,
  surahData,
  setShowSettings,
}) {
  const [savedI, setSavedI] = useState([])
  const hasAccount = loadLocal('quran').accounts.active

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

  async function close() {
    await readDone(surahI, setSurahI)
  }

  return (
    <>
      <div className="list_x df_jc_sb surah_name df_ai_ce_child">
        <div className="con_bd_df con_ha bd_ra_50 h_max" onClick={close}>
          <span className="material-symbols-outlined fz_big">close</span>
        </div>
        <b className="con_bg_gradient list_x">
          <div>{surahData?.number}</div>
          <div className="line_y"></div>
          <div>{surahData?.englishName}</div>
        </b>
        <div className="list_x">
          {hasAccount && (
            <div
              className="con_bd_df con_ha bd_ra_50 h_max"
              onClick={saveSurah}
            >
              <span
                className={`material-symbols-outlined fz_big ${
                  savedI.length > 0 && savedI.includes(surahI.surah)
                    ? 'fill'
                    : ''
                }`}
              >
                bookmark
              </span>
            </div>
          )}
          {!userHasRead && (
            <div
              className="con_bd_df con_ha bd_ra_50 h_max"
              onClick={() => setShowSettings(true)}
            >
              <span className="material-symbols-outlined fz_big">settings</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
