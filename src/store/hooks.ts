import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Типизированные версии useDispatch и useSelector
// Всегда используй эти хуки вместо оригинальных
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
