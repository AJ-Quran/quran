import { wait } from '@testing-library/user-event/dist/utils'
import { saveLastRead } from '../../../../../../js/db/quran/lastRead'
import { loadLocal, saveLocal } from '../../../../../../js/db/localStorage'
import { readStop } from '../../../../../../js/utils/read'

export async function readDone(surahI, setSurahI) {
  readStop()
  const hasAccount = loadLocal('quran').accounts.active

  if (hasAccount) saveLastRead(surahI)
  saveLastReadLocal(surahI)

  await wait(100)
  setSurahI({ ...surahI, surah: 0 })
}

function saveLastReadLocal(surahI) {
  const quran = loadLocal('quran')
  quran.quran.lastRead = surahI

  saveLocal('quran', quran)
}
