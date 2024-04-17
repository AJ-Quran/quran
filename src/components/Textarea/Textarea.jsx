import React, { useRef, useState } from 'react'

import './Textarea.css'

const Textarea = React.forwardRef(
  ({ label, value: iValue, areaProps, ...props }, ref) => {
    const textareaRef = useRef(null)
    const [value, setValue] = useState(iValue || '')

    function handleInputChange() {
      setValue(() => textareaRef.current.value)

      textareaRef.current.classList.remove('error')
    }

    function setRef(textarea) {
      textareaRef.current = textarea
      if (typeof ref === 'function') ref(textarea)
      else if (ref) ref.current = textarea
    }

    return (
      <>
        <div className="textarea_area">
          <label className={value ? 'active' : ''}>{label}</label>
          <textarea
            className="scroll_y"
            ref={setRef}
            onChange={handleInputChange}
            {...props}
          ></textarea>
        </div>
      </>
    )
  }
)

export default Textarea
