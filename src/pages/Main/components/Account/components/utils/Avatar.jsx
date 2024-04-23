import { useEffect, useState } from 'react'

import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'

import './Avatar.css'

async function getUserAvatar(username) {
  username = username ? username : loadLocal('quran').accounts.active

  const img = await load(`accounts/${username}/user/img/img`)
  const name = await load(`accounts/${username}/user/name`)

  return { name: name[0], img }
}

export default function Avatar({ style, username, children, ...props }) {
  const [data, setData] = useState({ name: '', img: '' })

  useEffect(() => {
    async function loadData() {
      const userAvatar = username
        ? await getUserAvatar(username)
        : await getUserAvatar()
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
