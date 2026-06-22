import { StoreProvider } from './providers/StoreProvider'
import { AppRouter } from './providers/RouterProvider'
import './styles/global.css'

export function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}
