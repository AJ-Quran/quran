import { useState } from 'react'

import './Slider.css'

export default function Slider({
  min,
  max,
  range,
  value: iValue,
  onChange,
  className,
}) {
  const [value, setValue] = useState(iValue || min)

  function getValue() {
    return ((value - min) / (max - min)) * 100
  }

  function handleChange(e) {
    setValue(e.target.value)
    if (onChange) onChange(e.target.value)
  }

  return (
    <>
      <div className={`con slider_area ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          step={range}
          onChange={handleChange}
          className="slider_input"
        />
        <div className="slider_bg" style={{ width: `${getValue()}%` }}></div>
      </div>
    </>
  )
}
