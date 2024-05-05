import { loadLocal, saveLocal } from '../../../../../js/db/localStorage'
import { getLocalInitialData } from '../../../../../js/utils/checkers'

export function getFontSize() {
  const localData = loadLocal('quran')
  const initialData = getLocalInitialData()

  if (!localData.settings.fontSize) {
    localData.settings.fontSize = initialData.settings.fontSize
    saveLocal('quran', localData)
  }

  const fontSizes = {
    ar: localData.settings.fontSize.arabic,
    en: localData.settings.fontSize.english,
  }

  return fontSizes
}

export const fontSizeData = {
  ar: {
    min: '14',
    max: '30',
  },
  en: {
    min: '14',
    max: '20',
  },
}
