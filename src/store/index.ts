import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from '@/features/auth/model/authSlice'
import { exchangeRequestsReducer } from '@/features/exchange-offer/model/exchangeRequestsSlice'
import { favoritesReducer } from '@/features/favorites/model/favoritesSlice'
import { notificationsReducer } from '@/features/notifications/model/notificationsSlice'
import { profileReducer } from '@/features/profile/model/profileSlice'

import {
  PERSISTENCE_STORAGE_KEYS,
  setupStorePersistence,
  type PersistenceEntry,
  type PersistenceUnsubscribe,
} from './persistence'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exchangeRequests: exchangeRequestsReducer,
    favorites: favoritesReducer,
    notifications: notificationsReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const persistenceEntries: readonly PersistenceEntry<RootState>[] = [
  {
    key: PERSISTENCE_STORAGE_KEYS.AUTH_USER,
    select: (state) => state.auth.user,
    removeWhen: (user) => user === null,
  },
  {
    key: PERSISTENCE_STORAGE_KEYS.REGISTERED_USERS,
    select: (state) => state.auth.registeredUsers,
  },
  {
    key: PERSISTENCE_STORAGE_KEYS.FAVORITES,
    select: (state) => state.favorites.byUserId,
  },
  {
    key: PERSISTENCE_STORAGE_KEYS.REQUESTS,
    select: (state) => state.exchangeRequests.items,
  },
  {
    key: PERSISTENCE_STORAGE_KEYS.SEEN_NOTIFICATIONS,
    select: (state) => state.notifications.seenIdsByUserId,
  },
  {
    key: PERSISTENCE_STORAGE_KEYS.PROFILE_OVERRIDES,
    select: (state) => state.profile.overridesByUserId,
  },
]

export const stopStorePersistence: PersistenceUnsubscribe = setupStorePersistence(
  store,
  persistenceEntries,
)

export { useAppDispatch, useAppSelector } from './hooks'
