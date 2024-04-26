import { useEffect, useState } from 'react'

import { getAvatar } from './getAvatar'

import './Avatar.css'

export default function Avatar({ style, username, children, ...props }) {
  const [data, setData] = useState({ name: '', img: '' })

  useEffect(() => {
    async function loadData() {
      const userAvatar = await getAvatar(username)
      setData(userAvatar)
    }
    loadData()
  }, [])

  return (
    <div className="avatar df_f_ce con_bd_cl" style={style} {...props}>
      {data?.img && <img src={data?.img} alt="Image" />}
      {data?.name && <span>{data?.name?.toUpperCase()}</span>}
      {!data?.img && !data?.name && (
        <span className="material-symbols-outlined">
          sentiment_dissatisfied
        </span>
      )}
      {children}
    </div>
  )
}
