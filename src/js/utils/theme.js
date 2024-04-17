export function isDarkTheme() {
  const darkTheme = window.matchMedia('(prefers-color-scheme: dark)')
  return darkTheme.matches
}
