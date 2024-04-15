import { useState, useEffect } from 'react'
import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/Loading'
import AyahsList from './components/AyahsList/AyahsList'
import SurahName from './components/SurahName/SurahName'

import useFetch from '../../../../../hooks/useFetch'
import { wait } from '../../../../../js/utils/wait'
import { toggleSurah } from '../../../../../js/db/quran/savedSurahs'
import { loadLocal } from '../../../../../js/db/localStorage'
import { load } from '../../../../../js/db/db'

import './ReadArea.css'

export default function ReadArea({ index, setSurahI }) {
  const [loading, setLoading] = useState(true)
  const [savedSurahs, setSavedSurahs] = useState([])
  const { data: arData } = useFetch(
    `https://api.alquran.cloud/v1/surah/${index.surah}/ar.alafasy`
  )
  const { data: engData } = useFetch(
    `https://api.alquran.cloud/v1/surah/${index.surah}/en.asad`
  )

  useEffect(() => {
    async function waiting() {
      await wait(1000)
      setLoading(false)
    }
    waiting()
  }, [])

  useEffect(() => {
    async function loadData() {
      const username = loadLocal('quran').accounts.active
      const data = await load(`accounts/${username}/quran/saved`)
      setSavedSurahs(data)
    }
    loadData()
  }, [])

  async function saveSurah(e) {
    const btn = e.target
    const icon = btn.firstChild

    icon.classList.toggle('fill')
    toggleSurah(index)
  }

  if (!index.surah) return null
  const arSurahData = arData?.data
  const engSurahData = engData?.data

  return (
    <>
      <div className="read_area df_jc_sb">
        <div className="list_x df_ai_ce h_max">
          <Button className="bg_none medium" onClick={() => setSurahI(0)}>
            <span className="material-symbols-outlined fz_big">close</span>
          </Button>
          {arSurahData && (
            <b className="txt_gradient fz_big list_x">
              <div>{arSurahData?.number}.</div>
              <div>{arSurahData?.englishName}</div>
            </b>
          )}
        </div>
        <div className="read_con list_y_big scroll_y">
          <div className="loading_area bd_ra df_jc_ce">
            {loading && (
              <Loading className="bd_ra">Surah's data is loading</Loading>
            )}
            {!loading && (
              <div className="list_x df_jc_sb w_100">
                <div></div>
                <SurahName surahData={arSurahData} />
                <div className="con_bg_df con_ha h_max" onClick={saveSurah}>
                  <span
                    className={`material-symbols-outlined ${
                      savedSurahs.length > 0 && savedSurahs.includes(index)
                        ? 'fill'
                        : ''
                    }`}
                  >
                    bookmark
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="loading_area bd_ra">
            {loading && <Loading className="bd_ra">Ayahs are loading</Loading>}
            {!loading && (
              <AyahsList
                arAyahs={arSurahData?.ayahs}
                engAyahs={engSurahData?.ayahs}
              />
            )}
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
