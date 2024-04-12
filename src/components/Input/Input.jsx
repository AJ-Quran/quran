import React, { useRef, useState } from 'react'
import Button from '../Button/Button'

import './Input.css'

const Input = React.forwardRef(
  ({ label, value: iValue, areaProps, ...props }, ref) => {
    const inputRef = useRef(null)
    const [value, setValue] = useState(iValue || '')
    const [seePassword, setSeePassword] = useState('visibility')

    function handleInputChange() {
      setValue(() => inputRef.current.value)

      inputRef.current.classList.remove('error')
    }

    function setInputRef(input) {
      inputRef.current = input
      if (typeof ref === 'function') ref(input)
      else if (ref) ref.current = input
    }

    function handleClick() {
      inputRef.current.focus()
      if (props.type === 'text') {
        setValue('')
        return
      }

      if (props.type === 'password') {
        const { type } = inputRef.current

        inputRef.current.type = type === 'text' ? 'password' : 'text'
        setSeePassword(type === 'text' ? 'visibility' : 'visibility_off')
      }
    }

    return (
      <div
        {...areaProps}
        className={`input_area list_x df_ai_ce ${areaProps?.className || ''}`}
      >
        <label className={value ? 'active' : ''}>{label}</label>
        <input
          {...props}
          value={value}
          ref={(input) => setInputRef(input)}
          onChange={handleInputChange}
        />
        <Button className="fz_small df_ce" onClick={handleClick}>
          {props.type === 'password' && (
            <span className="material-symbols-outlined">{seePassword}</span>
          )}

          {props.type === 'text' && (
            <span className="material-symbols-outlined">close</span>
          )}
        </Button>
      </div>
    )
  }
)

export default Input
