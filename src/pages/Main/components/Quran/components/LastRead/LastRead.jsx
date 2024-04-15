import { useEffect, useState } from 'react'

import Loading from '../../../../../../components/Loading/Loading'
import useFetch from '../../../../../../hooks/useFetch'
import { loadLocal } from '../../../../../../js/db/localStorage'
import { wait } from '@testing-library/user-event/dist/utils'
import { abPercent } from '../../../../../../js/math/percent'
import { floor } from '../../../../../../js/math/number'
import { openLastReadSurah } from '../List/util/openSurah'

import logo from '../../../../../../img/logo/bookLight.svg'

import './LastRead.css'

export default function LastRead({ setSurahI }) {
  const [loading, setLoading] = useState(true)
  const { data: surahs } = useFetch('https://api.alquran.cloud/v1/surah')
  const { lastRead } = loadLocal('quran').quran
  const lastReadSurah = surahs.data?.find(
    (surah) => surah.number === lastRead.surah
  )

  useEffect(() => {
    async function waiting() {
      await wait(1000)
      setLoading(false)
    }
    waiting()
  }, [])

  if (loading) return <Loading className="bd_ra last_read">Last read</Loading>

  const percent = abPercent(lastRead.ayah, lastReadSurah?.numberOfAyahs)

  return (
    <>
      <div
        className="con_bg_gradient con_ha last_read list_y df_jc_sb"
        onClick={() => openLastReadSurah(setSurahI)}
      >
        <div className="list_x">
          <span className="material-symbols-outlined fz_big">menu_book</span>
          <div>Last read</div>
        </div>
        <div className="list_y">
          <b>{lastReadSurah?.englishName}</b>
          <div className="fz_small txt_opa">
            {lastRead.ayah} verses read • {floor(percent)}%
          </div>
        </div>
        <img className="logo" src={logo} alt="Quran" />
      </div>
    </>
  )
}
