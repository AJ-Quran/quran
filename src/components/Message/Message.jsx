import { play } from '../../js/utils/audio'

import defaultAudio from '../../sounds/message/default.mp3'
import errorAudio from '../../sounds/message/error.mp3'
import warningAudio from '../../sounds/message/warning.mp3'
import successAudio from '../../sounds/message/success.mp3'

import './Message.css'

const audios = {
  default: new Audio(defaultAudio),
  success: new Audio(successAudio),
  warning: new Audio(warningAudio),
  error: new Audio(errorAudio),
}

const icons = {
  default: 'notifications',
  success: 'check_circle',
  warning: 'warning',
  error: 'error',
}

function getIcon(type) {
  return <span className="material-symbols-outlined icon">{icons[type]}</span>
}

export default function Message({ children, type = 'default', show }) {
  if (!show && !children) return null
  const icon = getIcon(type)

  play(audios[type])
  return (
    <div className={`message_area list_x df_ai_ce ${type}`}>
      {icon}
      <p>{children}</p>
      <div className="message_timeline"></div>
    </div>
  )
}
