import { useState } from 'react'

import FontSizeSlider from './FontSizeSlider'

import { txtCapitalizeFirstLetter } from '../../../../../../js/utils/txt'

const labelArr = {
  ar: 'arabic',
  en: 'english',
}

export default function FontSize({ label, min, max, range, value, example }) {
  const [fontSize, setFontSize] = useState(value)

  return (
    <>
      <div className="con_bg_dr list_y df_ai_ce font_size_area">
        <b>{txtCapitalizeFirstLetter(labelArr[label])}</b>
        <p
          className="con font_size_transition txt_alg_ce"
          style={{ fontSize: `${fontSize}px` }}
        >
          {example}
        </p>
        <FontSizeSlider
          label={label}
          min={min}
          max={max}
          range={range}
          value={fontSize}
          setFontSize={setFontSize}
        />
      </div>
    </>
  )
}
