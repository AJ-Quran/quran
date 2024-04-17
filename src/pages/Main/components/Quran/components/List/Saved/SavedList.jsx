import { useEffect, useState } from 'react'

import Loading from '../../../../../../../components/Loading/Loading'

import useFetch from '../../../../../../../hooks/useFetch'
import { wait } from '../../../../../../../js/utils/wait'
import { load } from '../../../../../../../js/db/db'
import { loadLocal } from '../../../../../../../js/db/localStorage'
import { isDarkTheme } from '../../../../../../../js/utils/theme'

import shapeDark from '../numShape/numShapeDark.svg'
import shapeLight from '../numShape/numShapeLight.svg'

import '../List.css'

const shape = isDarkTheme() ? shapeLight : shapeDark

export default function SurahsList({ surahI, setSurahI }) {
  const [loading, setLoading] = useState(true)
  const [savedI, setSavedI] = useState([])
  const { data: surahs } = useFetch('https://api.alquran.cloud/v1/surah')

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

  useEffect(() => {
    async function waiting() {
      await wait(1000)
      setLoading(false)
    }
    waiting()
  }, [])

  if (loading) return <Loading>Surahs are loading</Loading>

  return (
    <>
      <div className="list_y">
        {surahs.data?.map((surah, i) => {
          if (savedI.includes(i + 1))
            return (
              <div className="list_y" key={i}>
                <div
                  className="con_ha surah df_ai_ce_child df_jc_sb"
                  onClick={() =>
                    setSurahI({ ...surahI, surah: i + 1, ayah: 0 })
                  }
                >
                  <div className="list_x">
                    <div className="number df_f_ce">
                      <img src={shape} alt="shape" />
                      <div className="num">{surah.number}</div>
                    </div>
                    <div className="line_y"></div>
                    <div className="list_y">
                      <b className="w_100">{surah.englishName}</b>
                      <div className="list_x_small w_100 txt_opa fz_small">
                        <div>{surah.revelationType}</div>
                        <div>•</div>
                        <div>{surah.numberOfAyahs} verses</div>
                      </div>
                    </div>
                  </div>
                  <b className="txt_gradient">{surah.name}</b>
                </div>
                {savedI.at(-1) !== i + 1 && (
                  <div className="line_x_small"></div>
                )}
              </div>
            )
        })}
      </div>
    </>
  )
}
