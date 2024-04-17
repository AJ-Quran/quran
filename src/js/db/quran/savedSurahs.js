import { load, save } from '../db'
import { loadLocal } from '../localStorage'

export async function toggleSurah(indexData) {
  const username = loadLocal('quran').accounts.active
  const quran = await load(`accounts/${username}/quran`)

  const savedArr = quran?.saved || []
  const savedI = savedArr?.map((i) => i.surah).indexOf(indexData.surah)

  if (savedI === -1) {
    savedArr.push(indexData)
  } else {
    savedArr.splice(savedI, 1)
  }

  await save(`accounts/${username}/quran/saved`, savedArr)
}
