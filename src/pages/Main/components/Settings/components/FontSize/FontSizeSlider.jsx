import Slider from '../../../../../../components/Slider/Slider'

import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'

const labelArr = {
  ar: 'arabic',
  en: 'english',
}

export default function FontSizeSlider({
  label,
  min,
  max,
  range,
  value,
  setFontSize,
  className,
  darkSlider,
}) {
  function changeFontSize(fzVal) {
    setFontSize(fzVal)

    const localData = loadLocal('quran')
    localData.settings.fontSize[labelArr[label]] = fzVal

    saveLocal('quran', localData)
  }

  return (
    <>
      <div className={`list_x df_jc_ce df_ai_ce w_100 ${className}`}>
        <span className="material-symbols-outlined fz_normal">title</span>
        <Slider
          min={min}
          max={max}
          range={range}
          value={value}
          onChange={changeFontSize}
          className={darkSlider ? 'bg_theme_dr' : ''}
        />
        <span className="material-symbols-outlined">title</span>
      </div>
    </>
  )
}
