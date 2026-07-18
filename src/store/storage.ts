type StorageValidator<T> = (value: unknown) => value is T

export const canUseLocalStorage = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return Boolean(window.localStorage)
  } catch {
    return false
  }
}

export const readStorage = <T>(
  key: string,
  fallback: T,
  validate?: StorageValidator<T>,
): T => {
  if (!canUseLocalStorage()) {
    return fallback
  }

  try {
    const rawValue = window.localStorage.getItem(key)

    if (rawValue === null) {
      return fallback
    }

    const parsedValue: unknown = JSON.parse(rawValue)

    if (validate && !validate(parsedValue)) {
      return fallback
    }

    return parsedValue as T
  } catch {
    return fallback
  }
}

export const writeStorage = <T>(key: string, value: T): void => {
  if (!canUseLocalStorage()) {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    return
  }
}

export const removeStorage = (key: string): void => {
  if (!canUseLocalStorage()) {
    return
  }

  try {
    window.localStorage.removeItem(key)
  } catch {
    return
  }
}
