import { configureStore } from '@reduxjs/toolkit'
// Импортируй свои slice'ы здесь по мере их создания:
// import skillsReducer from '@/entities/skill/model/skillsSlice'
// import authReducer from '@/features/auth/model/authSlice'

export const store = configureStore({
  reducer: {
    // skills: skillsReducer,
    // auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
