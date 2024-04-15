import { progressPercent } from '../../../../../../../js/math/percent'

import './ProgressBar.css'

export default function ProgressBar({ value, min = 0, max }) {
  return (
    <>
      <div className="progress_bar">
        <div
          className="progress_bar_con"
          style={{
            transform: `translateX(-${progressPercent(value, min, max)}%)`,
          }}
        ></div>
      </div>
    </>
  )
}
