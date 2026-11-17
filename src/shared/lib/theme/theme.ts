const THEME_KEY = 'skillswap_theme'

export type Theme = 'light' | 'dark'

export const getStoredTheme = (): Theme => {
  const stored = localStorage.getItem(THEME_KEY)
  return stored === 'light' || stored === 'dark' ? stored : 'light'
}

export const setStoredTheme = (theme: Theme): void => {
  localStorage.setItem(THEME_KEY, theme)
}

export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const toggleTheme = (): Theme => {
  const current = getStoredTheme()
  const next = current === 'light' ? 'dark' : 'light'
  setStoredTheme(next)
  applyTheme(next)
  return next
}

export const initTheme = (): void => {
  applyTheme(getStoredTheme())
}
