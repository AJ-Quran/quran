import { loadLocal } from '../../../../../../../js/db/localStorage'

export function openLastReadSurah(setSurahI) {
  const { lastRead } = loadLocal('quran').quran
  setSurahI(lastRead)
}
