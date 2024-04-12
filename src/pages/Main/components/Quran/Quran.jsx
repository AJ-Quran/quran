import { useState, useEffect } from 'react'

import LastRead from './components/LastRead/LastRead'
import SurahsList from './components/List/Surahs/SurahsList'
import SavedList from './components/List/Saved/SavedList'
import ReadArea from './ReadArea/ReadArea'
import Choose from '../../../../components/Choose/Choose'

import { loadLocal } from '../../../../js/db/localStorage'
import { load } from '../../../../js/db/db'

function Quran() {
  const [surahI, setSurahI] = useState(0)
  const [shownList, setShownList] = useState('surahsList')
  const [savedList, setSavedList] = useState([])

  useEffect(() => {
    async function loadData() {
      const username = loadLocal('quran').accounts.active
      const data = await load(`accounts/${username}/quran/saved`)
      setSavedList(data)
    }
    loadData()
  }, [])

  return (
    <>
      <div className="list_y h_max_100 scroll_y">
        <LastRead surah="Al-Faatiha" verse="1" />
        {(savedList || savedList.lenght > 0) && (
          <div className="quran_choose_area con_bg_dr">
            <Choose axe="x" iOption="surahsList">
              <div
                className="list_x_small df_ai_ce"
                option="surahsList"
                onClick={() => setShownList('surahsList')}
              >
                <span className="material-symbols-outlined fz_normal">
                  menu_book
                </span>
                <div>Surahs</div>
              </div>
              <div
                className="list_x_small df_ai_ce"
                option="savedList"
                onClick={() => setShownList('savedList')}
              >
                <span className="material-symbols-outlined fz_normal">
                  bookmark
                </span>
                <div>Saved</div>
              </div>
            </Choose>
          </div>
        )}
        <div className="loading_area bd_ra">
          {shownList === 'surahsList' && (
            <SurahsList setSurahI={setSurahI}></SurahsList>
          )}
          {shownList === 'savedList' && (
            <SavedList setSurahI={setSurahI}></SavedList>
          )}
        </div>
        <div></div>
        {surahI > 0 && <ReadArea index={surahI} setSurahI={setSurahI} />}
      </div>
    </>
  )
}

export default Quran
