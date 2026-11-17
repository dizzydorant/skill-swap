import { useCallback, useEffect } from 'react'

import { getStoredTheme, applyTheme, toggleTheme as toggleThemeFn } from './theme'

export const useTheme = () => {
  useEffect(() => {
    applyTheme(getStoredTheme())
  }, [])

  const handleToggleTheme = useCallback(() => {
    toggleThemeFn()
  }, [])

  return {
    currentTheme: getStoredTheme(),
    isDark: getStoredTheme() === 'dark',
    toggleTheme: handleToggleTheme,
  }
}
