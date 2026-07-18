import type { EnhancedStore } from '@reduxjs/toolkit'

import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'

import { removeStorage, writeStorage } from './storage'

export const PERSISTENCE_STORAGE_KEYS = {
  AUTH_USER: LOCAL_STORAGE_KEYS.AUTH_USER,
  REGISTERED_USERS: LOCAL_STORAGE_KEYS.REGISTERED_USERS,
  FAVORITES: LOCAL_STORAGE_KEYS.FAVORITES,
  REQUESTS: LOCAL_STORAGE_KEYS.REQUESTS,
  SEEN_NOTIFICATIONS: LOCAL_STORAGE_KEYS.SEEN_NOTIFICATIONS,
  PROFILE_OVERRIDES: LOCAL_STORAGE_KEYS.PROFILE_OVERRIDES,
} as const

export type PersistenceStorageKey =
  (typeof PERSISTENCE_STORAGE_KEYS)[keyof typeof PERSISTENCE_STORAGE_KEYS]

export type PersistenceUnsubscribe = () => void

export interface PersistenceEntry<TState, TValue = unknown> {
  key: PersistenceStorageKey
  select: (state: TState) => TValue
  shouldPersist?: (value: TValue) => boolean
  removeWhen?: (value: TValue) => boolean
}

const serialize = (value: unknown): string | null => {
  try {
    return JSON.stringify(value)
  } catch {
    return null
  }
}

export const setupStorePersistence = <TState>(
  store: Pick<EnhancedStore<TState>, 'getState' | 'subscribe'>,
  entries: readonly PersistenceEntry<TState>[] = [],
): PersistenceUnsubscribe => {
  if (entries.length === 0) {
    return () => undefined
  }

  const lastSerializedByKey = new Map<PersistenceStorageKey, string>()
  const initialState = store.getState()

  entries.forEach((entry) => {
    const selectedValue = entry.select(initialState)

    if (selectedValue === undefined || entry.removeWhen?.(selectedValue)) {
      return
    }

    const serializedValue = serialize(selectedValue)

    if (serializedValue !== null) {
      lastSerializedByKey.set(entry.key, serializedValue)
    }
  })

  return store.subscribe(() => {
    const state = store.getState()

    entries.forEach((entry) => {
      const selectedValue = entry.select(state)

      if (entry.removeWhen?.(selectedValue)) {
        removeStorage(entry.key)
        lastSerializedByKey.delete(entry.key)
        return
      }

      if (selectedValue === undefined) {
        return
      }

      if (entry.shouldPersist && !entry.shouldPersist(selectedValue)) {
        return
      }

      const serializedValue = serialize(selectedValue)

      if (serializedValue === null || lastSerializedByKey.get(entry.key) === serializedValue) {
        return
      }

      writeStorage(entry.key, selectedValue)
      lastSerializedByKey.set(entry.key, serializedValue)
    })
  })
}
