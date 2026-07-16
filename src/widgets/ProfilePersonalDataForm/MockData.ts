export interface UserMockData {
  id: string
  email: string
  password?: string
  fullName: string
  sex: 'male' | 'female' | 'other' | ''
  birthday: string // Формат YYYY-MM-DD
  avatarUrl: string
  location: string
  role?: string
  createdAt?: string
  bio: string
  wantedSkillIds?: string[]
  favoriteSkillIds?: string[]
}

export const mockUsersList: UserMockData = {
  id: '1',
  email: 'Mariia@gmail.com',
  password: '12345',
  fullName: 'Мария',
  sex: 'female',
  birthday: '1995-10-28',
  avatarUrl: 'https://unsplash.com',
  location: 'Москва',
  role: 'user',
  createdAt: '2024-03-12T09:15:00.000Z',
  bio: 'Люблю учиться новому, особенно если это можно делать за чаем и в пижаме. Всегда готова пообщаться и обменяться чем-то интересным!',
  wantedSkillIds: ['skill-006', 'skill-014'],
  favoriteSkillIds: ['skill-013'],
}
