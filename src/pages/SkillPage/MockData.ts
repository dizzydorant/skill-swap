import type { SkillSectionCard } from '@/widgets/SkillSection'

export interface MockSkillPageData {
  skill: {
    id: string
    title: string
    description: string
    type: string
    categoryId: number
    subCategoryId: number
    tags: string[]
    imageUrl: string
    images: string[]
    authorId: string
    likedByUserIds: string[]
    likesCount: number
    createdAt: string
    updatedAt: string
  }
  author: {
    fullName: string
    avatarUrl?: string
    location: string
    age: number
    bio: string
    teachSkillTitles: string[]
    learnSkillTitles: string[]
  }
  similarSkills: SkillSectionCard[]
}

export const MOCK_SKILL_PAGE_DATA: MockSkillPageData = {
  skill: {
    id: 'skill-001',
    title: 'Игра на барабанах',
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры.',
    type: 'teach',
    categoryId: 1,
    subCategoryId: 101,
    tags: ['Музыка и звук', 'Творчество и искусство'],
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSnxdsjaOqQYmUN4NSnDIHiR97OXZ-CW0CCxKXiTLdzg&s=10',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/d/df/2006-07-06_drum_set.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YhIY7v6Bbjaw8OzVb-Q1j2yBIOtrbRR12tYQzjsM6w&s=10',
      'https://mirm.ru/blog/wp-content/uploads/2016/08/pla_2.jpg',
      'https://kto72.ru/upload/iblock/667/Bass_drum_and_mallets.jpg',
    ],
    authorId: '2',
    likedByUserIds: ['5', '8', '11', '14', '17', '20'],
    likesCount: 6,
    createdAt: '2025-10-02T10:07:00Z',
    updatedAt: '2025-10-02T10:07:00Z',
  },
  // Данные автора навыка
  author: {
    fullName: 'Иван',
    avatarUrl: 'https://unsplash.com',
    location: 'Санкт-Петербург',
    age: 24,
    bio: 'Привет! Люблю ритм, кофе и людей, которые не боятся пробовать новое.',
    teachSkillTitles: ['Игра на барабанах'],
    learnSkillTitles: ['Тайм-менеджмент', 'Медитация'],
  },
  // 4 карточки пользователей для блока похожих предложений
  similarSkills: [
    {
      id: 'sim-1',
      user: {
        name: 'Илона',
        city: 'Екатеринбург',
        age: 33,
        avatar: 'https://unsplash.com',
      },
      teachSkills: [{ id: 't1', label: 'Английский язык' }],
      learnSkills: [
        { id: 'l1', label: 'Тайм-менеджмент' },
        { id: 'l2', label: 'Медитация' },
      ],
      likesCount: 0,
      isLiked: false,
      isExchangeOffered: false,
    },
    {
      id: 'sim-2',
      user: {
        name: 'Михаил',
        city: 'Новосибирск',
        age: 29,
        avatar: 'https://unsplash.com',
      },
      teachSkills: [{ id: 't2', label: 'Английский язык' }],
      learnSkills: [
        { id: 'l3', label: 'Тайм-менеджмент' },
        { id: 'l4', label: 'Медитация' },
      ],
      likesCount: 0,
      isLiked: false,
      isExchangeOffered: false,
    },
    {
      id: 'sim-3',
      user: {
        name: 'Мария',
        city: 'Краснодар',
        age: 21,
        avatar: 'https://unsplash.com',
      },
      teachSkills: [{ id: 't3', label: 'Английский язык' }],
      learnSkills: [
        { id: 'l5', label: 'Тайм-менеджмент' },
        { id: 'l6', label: 'Медитация' },
      ],
      likesCount: 0,
      isLiked: false,
      isExchangeOffered: false,
    },
    {
      id: 'sim-4',
      user: {
        name: 'Виктория',
        city: 'Кемерово',
        age: 30,
        avatar: 'https://unsplash.com',
      },
      teachSkills: [{ id: 't4', label: 'Английский язык' }],
      learnSkills: [
        { id: 'l7', label: 'Тайм-менеджмент' },
        { id: 'l8', label: 'Медитация' },
      ],
      likesCount: 0,
      isLiked: false,
      isExchangeOffered: false,
    },
  ],
}
