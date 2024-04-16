import { saveOrEdit } from '../db'
import { loadLocal } from '../localStorage'

export async function saveLastRead(surahI) {
  const username = loadLocal('quran').accounts.active
  await saveOrEdit(`accounts/${username}/quran/lastRead`, surahI)
}
