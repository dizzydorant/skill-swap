import { useEffect } from 'react'

import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './providers/RouterProvider'
import { initTheme } from '../shared/lib/theme/theme'
import './styles/global.css'

export function App() {
  useEffect(() => {
    initTheme()
  }, [])

  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}
