import { useEffect, useMemo, useState } from 'react'

import {
  getProfileOverrides,
  saveAuthUser,
  saveProfileOverride,
  type SavedProfileData,
} from '@/features/auth/model/authUtils'
import { useAuthUser } from '@/features/auth/model/useAuthUser'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { ProfilePersonalDataForm } from '@/widgets/ProfilePersonalDataForm'
import { ProfileSidebar } from '@/widgets/ProfileSidebar'

import styles from './ProfilePage.module.css'

interface ProfileDbUser {
  id: string
  email: string
  fullName: string
  sex: 'male' | 'female' | 'other' | ''
  birthday: string
  avatarUrl: string | null
  location: string
  bio: string
}

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

export const ProfilePage = () => {
  const { user: authUser } = useAuthUser()
  const [users, setUsers] = useState<ProfileDbUser[]>([])
  const [cities, setCities] = useState<CityDbItem[]>([])
  const [profileOverrides, setProfileOverrides] = useState<SavedProfileData[]>(() =>
    getProfileOverrides(),
  )
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
    const dbUser = users.find((user) => user.id === authUser?.id) ?? users[0] ?? null

    if (!dbUser) {
      return null
    }

    const savedProfile = profileOverrides.find((profile) => profile.id === dbUser.id)

    return savedProfile ? { ...dbUser, ...savedProfile } : dbUser
  }, [authUser?.id, profileOverrides, users])

  const handleProfileSave = (profile: SavedProfileData) => {
    saveProfileOverride(profile)
    setProfileOverrides(getProfileOverrides())

    if (authUser?.id === profile.id) {
      saveAuthUser({
        id: profile.id,
        email: profile.email,
        name: profile.fullName,
        avatarUrl: profile.avatarUrl,
      })
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
