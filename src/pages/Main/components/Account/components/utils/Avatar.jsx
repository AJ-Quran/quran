import { useEffect, useState } from 'react'

import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'

import './Avatar.css'

async function getName() {
  const username = loadLocal('quran').accounts.active
  const name = await load(`accounts/${username}/user/name`)

  return name[0]
}

export default function Avatar({ style, letter, children, img }) {
  const [name, setName] = useState(() => '')

  useEffect(() => {
    if (img) return
    if (letter) {
      setName(letter)
      return
    }

    async function loadData() {
      setName(await getName())
    }
    loadData()
  }, [])

  if (img) {
    return (
      <div className="avatar df_f_ce con_bd_cl" style={style}>
        <img src={img} alt="Image" />
        {children}
      </div>
    )
  }

  return (
    <div className="avatar df_f_ce con_bd_cl" style={style}>
      <span>{name?.toUpperCase() || 'A'}</span>
      {children}
    </div>
  )
}
