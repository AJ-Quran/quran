import { useEffect, useState } from 'react'

import { load } from '../../../../../../js/db/db'
import { loadLocal } from '../../../../../../js/db/localStorage'

import './Avatar.css'

async function getName() {
  const username = loadLocal('quran').accounts.active
  const name = await load(`accounts/${username}/user/name`)

  return name[0]
}

export default function Avatar({ style, letter }) {
  const [name, setName] = useState(() => '')

  useEffect(() => {
    if (letter) {
      setName(letter)
      return
    }

    async function loadData() {
      setName(await getName())
    }
    loadData()
  }, [])

  return (
    <div className="avatar df_f_ce con_bd_cl" style={style}>
      <span>{name.toUpperCase()}</span>
    </div>
  )
}
