import { loadLocal, saveLocal } from '../db/localStorage'

export function isDarkTheme() {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  return darkTheme.matches
}

export function changeTheme(theme) {
  const quran = loadLocal('quran')
  quran.settings.theme = theme

  saveLocal('quran', quran)
  document.body.setAttribute('theme', theme)
}

export function checkTheme() {
  const quran = loadLocal('quran')
  const { theme } = quran.settings

  document.body.setAttribute('theme', theme)
}
