import { useState, useEffect } from 'react'
import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/Loading'
import AyahsList from './components/AyahsList/AyahsList'
import SurahName from './components/SurahName/SurahName'

import useFetch from '../../../../../hooks/useFetch'
import { wait } from '../../../../../js/utils/wait'

import './ReadArea.css'

export default function ReadArea({ surahI, setSurahI }) {
  const [loading, setLoading] = useState(true)
  const { data: arData } = useFetch(
    `https://api.alquran.cloud/v1/surah/${surahI.surah}/ar.alafasy`
  )
  const { data: engData } = useFetch(
    `https://api.alquran.cloud/v1/surah/${surahI.surah}/en.asad`
  )

  useEffect(() => {
    async function waiting() {
      await wait(1000)
      setLoading(false)
    }
    waiting()
  }, [])

  if (!surahI.surah) return null
  const arSurahData = arData?.data
  const engSurahData = engData?.data

  return (
    <>
      <div className="read_area df_jc_sb">
        <div className="list_x df_ai_ce h_max">
          <Button className="bg_none medium" onClick={() => setSurahI(0)}>
            <span className="material-symbols-outlined fz_big">close</span>
          </Button>
        </div>
        <div className="read_con list_y_big scroll_y">
          <div className="loading_area bd_ra df_jc_ce">
            {loading && (
              <Loading className="bd_ra">Surah's data is loading</Loading>
            )}
            {!loading && <SurahName surahI={surahI} surahData={arSurahData} />}
          </div>
          {!loading && (
            <AyahsList
              arAyahs={arSurahData?.ayahs}
              engAyahs={engSurahData?.ayahs}
            />
          )}
        </div>
      </div>
    </>
  )
}
