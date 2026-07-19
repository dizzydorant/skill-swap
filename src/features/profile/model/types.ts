export interface ProfileData {
  id: string
  email: string
  fullName: string
  sex: 'male' | 'female' | 'other' | ''
  birthday: string
  avatarUrl: string | null
  location: string
  bio: string
}

export type ProfileOverridesByUserId = Record<string, ProfileData>
