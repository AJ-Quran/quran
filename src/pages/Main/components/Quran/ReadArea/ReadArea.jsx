import { useState, useEffect } from 'react'

import Button from '../../../../../components/Button/Button'
import Loading from '../../../../../components/Loading/Loading'
import AyahsArea from './components/AyahsArea/AyahsArea'
import SurahName from './components/SurahName/SurahName'

import useFetch from '../../../../../hooks/useFetch'
import { wait } from '../../../../../js/utils/wait'
import { readDone } from './util/readDone'

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

  async function close() {
    await readDone(surahI, setSurahI)
  }

  if (!surahI.surah) return null

  const arSurahData = arData?.data
  const engSurahData = engData?.data

  return (
    <>
      <div className="read_area df_jc_sb">
        <div className="list_x df_jc_sb h_max">
          <Button className="bg_none medium" onClick={close}>
            <span className="material-symbols-outlined fz_big">close</span>
          </Button>
        </div>
        <div className="read_con list_y_big scroll_y">
          <div className="loading_area bd_ra mar_ce">
            {loading && (
              <Loading className="bd_ra">Surah's data is loading</Loading>
            )}
            {!loading && <SurahName surahI={surahI} surahData={arSurahData} />}
          </div>
          {!loading && (
            <AyahsArea
              arAyahs={arSurahData?.ayahs}
              engAyahs={engSurahData?.ayahs}
              surahI={surahI}
              setSurahI={setSurahI}
            />
          )}
        </div>
      </div>
    </>
  )
}
