import { useState } from 'react'

import Slider from '../../../../../../components/Slider/Slider'

import { txtCapitalizeFirstLetter } from '../../../../../../js/utils/txt'
import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'

const labelArr = {
  ar: 'arabic',
  en: 'english',
}

export default function FontSize({ label, min, max, range, value, example }) {
  const [fontSize, setFontSize] = useState(value)

  function changeFontSize(fzVal) {
    setFontSize(fzVal)

    const localData = loadLocal('quran')
    localData.settings.fontSize[labelArr[label]] = fzVal

    saveLocal('quran', localData)
  }

  return (
    <>
      <div className="con_bg_dr list_y df_ai_ce font_size_area">
        <b>{txtCapitalizeFirstLetter(labelArr[label])}</b>
        <p className="con" style={{ fontSize: `${fontSize}px` }}>
          {example}
        </p>
        <div className="list_x df_jc_ce w_100">
          <span className="material-symbols-outlined fz_normal">title</span>
          <Slider
            min={min}
            max={max}
            range={range}
            value={value}
            onChange={changeFontSize}
          />
          <span className="material-symbols-outlined">title</span>
        </div>
      </div>
    </>
  )
}
