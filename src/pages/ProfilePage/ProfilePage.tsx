import { useEffect, useMemo, useState } from 'react'

import { type RegisteredUser } from '@/features/auth/model/authUtils'
import {
  selectRegisteredUsers,
  updateAuthUser,
  updateRegisteredUserProfile,
} from '@/features/auth/model/authSlice'
import { useAuthUser } from '@/features/auth/model/useAuthUser'
import {
  saveProfile,
  selectCurrentProfile,
  selectCurrentProfileOverride,
} from '@/features/profile/model/profileSlice'
import type { ProfileData } from '@/features/profile/model/types'
import { useAppDispatch, useAppSelector } from '@/store'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { ProfilePersonalDataForm } from '@/widgets/ProfilePersonalDataForm'
import { ProfileSidebar } from '@/widgets/ProfileSidebar'

import styles from './ProfilePage.module.css'

type ProfileDbUser = ProfileData

interface CityDbItem {
  id: string
  name: string
}

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to load ${url}`)
  }

  return (await response.json()) as T
}

const normalizeProfileGender = (gender: string): ProfileDbUser['sex'] => {
  if (gender === 'male' || gender === 'female' || gender === 'other') {
    return gender
  }

  return ''
}

const createProfileFromRegisteredUser = (user: RegisteredUser): ProfileDbUser => ({
  id: user.id,
  email: user.email,
  fullName: user.name,
  sex: normalizeProfileGender(user.gender),
  birthday: user.birthday ?? '',
  avatarUrl: user.avatarUrl,
  location: user.cityName || user.city,
  bio: '',
})

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const { user: authUser } = useAuthUser()
  const registeredUsers = useAppSelector(selectRegisteredUsers)
  const currentProfile = useAppSelector(selectCurrentProfile)
  const currentProfileOverride = useAppSelector(selectCurrentProfileOverride)
  const authUserId = authUser?.id
  const [users, setUsers] = useState<ProfileDbUser[]>([])
  const [cities, setCities] = useState<CityDbItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadProfileData = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)

        const [loadedUsers, loadedCities] = await Promise.all([
          fetchJson<ProfileDbUser[]>('/db/users.json'),
          fetchJson<CityDbItem[]>('/db/cities.json'),
        ])

        if (isMounted) {
          setUsers(loadedUsers)
          setCities(loadedCities)
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error instanceof Error ? error : new Error('Profile data loading failed'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadProfileData()

    return () => {
      isMounted = false
    }
  }, [])

  const profileUser = useMemo(() => {
    if (!authUserId) {
      return null
    }

    const baseUser =
      users.find((user) => user.id === authUserId) ??
      registeredUsers
        .filter((user) => user.id === authUserId)
        .map(createProfileFromRegisteredUser)[0] ??
      currentProfile

    if (!baseUser) {
      return null
    }

    return currentProfileOverride ? { ...baseUser, ...currentProfileOverride } : baseUser
  }, [authUserId, currentProfile, currentProfileOverride, registeredUsers, users])

  const handleProfileSave = (profile: ProfileData) => {
    dispatch(saveProfile({ userId: profile.id, data: profile }))
    dispatch(updateRegisteredUserProfile(profile))

    if (authUser?.id === profile.id) {
      dispatch(
        updateAuthUser({
          id: profile.id,
          email: profile.email,
          name: profile.fullName,
          avatarUrl: profile.avatarUrl,
        }),
      )
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.profileContainer}>
          <ProfileSidebar activeItemId="personal-data" />

          <section className={styles.profileContent}>
            {isLoading ? (
              <p className={styles.stateText}>Загружаем профиль...</p>
            ) : loadError || !profileUser ? (
              <p className={styles.stateText}>Не удалось загрузить данные профиля</p>
            ) : (
              <ProfilePersonalDataForm
                initialUser={profileUser}
                cities={cities}
                onSubmit={handleProfileSave}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProfilePage
