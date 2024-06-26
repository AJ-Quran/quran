import { useState, useEffect } from 'react'

import Loading from '../../../../../components/Loading/Loading'
import AyahsArea from './components/AyahsArea/AyahsArea'
import SurahName from './components/SurahName/SurahName'
import UserHasRead from './components/UserHasRead/UserHasRead'
import Alert from '../../../../../components/Alert/Alert'
import FontSize from '../../Settings/components/FontSize/FontSize'

import useFetch from '../../../../../hooks/useFetch'
import { wait } from '../../../../../js/utils/wait'
import { fontSizeData, getFontSize } from '../../Settings/utils/getFontSize'

import './ReadArea.css'

export default function ReadArea({ surahI, setSurahI }) {
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const fontSizes = getFontSize()
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

  if ((!arSurahData || !engSurahData) && !loading)
    return (
      <div className="read_area df_jc_sb">
        <div className="read_con df_f_ce list_y">
          <b className="txt_yellow">Something went wrong! Try again</b>
          <div
            className="con_bd_cl con_bg_gradient con_ha bd_btn list_x df_f_ce"
            onClick={() => setSurahI({ ...surahI, surah: 0 })}
          >
            <span className="material-symbols-outlined fz_normal">
              menu_book
            </span>
            <span>
              Back to <b>Quran</b>
            </span>
          </div>
        </div>
      </div>
    )

  const userHasRead =
    surahI.surah === arSurahData?.number &&
    surahI.ayah === arSurahData?.numberOfAyahs

  return (
    <>
      <div className="read_area df_jc_sb">
        <div className="read_con list_y_big scroll_y">
          <div className="loading_area bd_ra mar_ce">
            {loading && (
              <Loading className="bd_ra">Surah's data is loading</Loading>
            )}
            {!loading && (
              <SurahName
                surahI={surahI}
                setSurahI={setSurahI}
                userHasRead={userHasRead}
                surahData={arSurahData}
                setShowSettings={setShowSettings}
              />
            )}
          </div>
          {!loading && !userHasRead && (
            <AyahsArea
              arAyahs={arSurahData?.ayahs}
              engAyahs={engSurahData?.ayahs}
              surahI={surahI}
              setSurahI={setSurahI}
            />
          )}
          {!loading && userHasRead && (
            <UserHasRead surahI={surahI} setSurahI={setSurahI} />
          )}
        </div>
        {showSettings && (
          <Alert onHide={() => setShowSettings(false)}>
            <div className="title df_jc_ce">Font Size</div>
            <div className="line_x line_dark"></div>
            <FontSize
              label="ar"
              min={fontSizeData.ar.min}
              max={fontSizeData.ar.max}
              value={fontSizes.ar}
              example="بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ"
            />
            <FontSize
              label="en"
              min={fontSizeData.en.min}
              max={fontSizeData.en.max}
              value={fontSizes.en}
              example="In the name of God, the Most Gracious, the Most Merciful"
            />
          </Alert>
        )}
      </div>
    </>
  )
}
