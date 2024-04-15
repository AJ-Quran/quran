import { loadLocal } from '../../../../../../../js/db/localStorage'

export function openSurah(i, setSurahI) {
  const lastRead = loadLocal('quran').quran.lastRead

  if (lastRead.surah === i) setSurahI(lastRead)
  else setSurahI({ surah: i, ayah: 0 })
}

export function openLastReadSurah(setSurahI) {
  const { lastRead } = loadLocal('quran').quran
  setSurahI(lastRead)
}
