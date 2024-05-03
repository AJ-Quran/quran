import { useState } from 'react'

import Slider from '../../../../../../components/Slider/Slider'

import { txtCapitalizeFirstLetter } from '../../../../../../js/utils/txt'
import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'

import './FontSize.css'

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
      <div className="list_y font_size_area">
        <div className="df_jc_sb w_100">
          <div>{txtCapitalizeFirstLetter(labelArr[label])}</div>
          <Slider
            min={min}
            max={max}
            range={range}
            value={value}
            onChange={changeFontSize}
            className="bg_theme_dr"
          />
        </div>
        <p
          className={`con_bg_dr txt_${label}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {example}
        </p>
      </div>
    </>
  )
}
