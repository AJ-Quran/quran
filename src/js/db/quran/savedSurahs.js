import { load, save } from '../db'
import { loadLocal } from '../localStorage'

async function toggleSurah(index) {
  const username = loadLocal('quran').accounts.active
  const account = await load(`accounts/${username}`)

  const savedArr = account.quran?.saved || []
  const savedI = savedArr.indexOf(index)

  if (savedI === -1) {
    savedArr.push(index)
  } else {
    savedArr.splice(savedI, 1)
  }

  await save(`accounts/${username}/quran/saved`, savedArr)
}

export { toggleSurah }
