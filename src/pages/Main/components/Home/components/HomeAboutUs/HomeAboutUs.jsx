import { useEffect, useState } from 'react'

import Loading from '../../../../../../components/Loading/Loading'
import GetPerson from './GetPerson'

import { load } from '../../../../../../js/db/db'

export default function HomeAboutUs() {
  const [people, setPeople] = useState([])

  useEffect(() => {
    async function loadData() {
      const data = await load(`dev/people`)
      setPeople(data)
    }
    loadData()
  }, [])

  return (
    <div className="h_100 list_y df_ai_ce df_jc_sb scroll_area home_page_item">
      <div className="list_y df_ai_ce two_blur_balls">
        <b className="main_big_text">
          <span className="txt_gradient">About us</span>
        </b>
        <div className="txt_opa txt_wrap_b txt_alg_ce">We are the developers of AJ Quran 🧑‍💻📖</div>
      </div>
      <div className="list_y df_ai_ce">
        <div className="list_x facts about_us_area">
          {people?.length === 0 && (
            <div className="loading_area bd_ra">
              <Loading className="bg_none">People are loading</Loading>
            </div>
          )}
          {people?.map((p, i) => GetPerson(p, i))}
        </div>
      </div>
      <div className="txt_opa fz_mono txt_wrap_b txt_alg_ce mission_txt">
        Our mission is to enable access to the <b>Quran</b> for all, anytime,
        anywhere
      </div>
      <div></div>
    </div>
  )
}
