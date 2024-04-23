import { useEffect, useState } from 'react'

import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'

import './Avatar.css'

export default function AvatarToEdit({ img, style, children }) {
  const [name, setName] = useState('')

  useEffect(() => {
    async function loadData() {
      const username = loadLocal('quran').accounts.active
      const data = await load(`accounts/${username}/user/name`)

      setName(data[0])
    }
    loadData()
  }, [])

  return (
    <div className="avatar df_f_ce con_bd_cl" style={style}>
      {img && <img src={img} alt="Image" />}
      {name && <span>{name?.toUpperCase()}</span>}
      {children}
    </div>
  )
}
