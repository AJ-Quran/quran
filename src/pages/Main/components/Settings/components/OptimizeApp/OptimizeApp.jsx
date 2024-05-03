import { useState } from 'react'

import Message from '../../../../../../components/Message/Message'

import { msgData } from '../../../../../../js/utils/message'
import { optimizeApp } from './optimize'

export default function OptimizeApp() {
  const [optimizing, setOptimizing] = useState(false)
  const [message, setMessage] = useState({
    msg: '',
    type: 'default',
    show: false,
  })

  async function optimize() {
    setOptimizing(true)
    await optimizeApp()
    setOptimizing(false)

    setMessage({
      msg: 'App optimized',
      type: 'success',
      show: true,
    })
    setTimeout(
      () => setMessage({ ...message, show: false }),
      msgData.time * 1000
    )
  }

  return (
    <>
      <Message show={message.show} type={message.type}>
        {message.msg}
      </Message>
      <div
        className="con_bd_df con_ha list_x df_jc_ce"
        onClick={optimize}
        disabled={optimizing}
      >
        <span className="material-symbols-outlined fz_normal">
          change_circle
        </span>
        <span>{optimizing ? 'Optimizing...' : 'Optimize'}</span>
      </div>
    </>
  )
}
