import type { ChipItem } from '@/shared/ui/ChipList'
import type { SkillCardUser } from '@/widgets/SkillCard'

export interface MockSkillCategoryRef {
  categoryId: number
  categoryName: string
  subcategoryId: number
  subcategoryName: string
}

export interface MockSkillChip extends ChipItem, MockSkillCategoryRef {}

export interface MockSkillCard {
  id: string
  user: SkillCardUser
  teachSkills: MockSkillChip[]
  learnSkills: MockSkillChip[]
  likesCount: number
  createdAt: string
  categoryId: number
  categoryName: string
  subcategoryId: number
  subcategoryName: string
  description: string
  images: string[]
}

export const mockSkillCards: MockSkillCard[] = [
  {
    id: '1',
    user: {
      name: 'Иван',
      city: 'Москва',
      age: 34,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg'
    },
    teachSkills: [
      {
        id: '1-teach',
        label: 'Делегирование и контроль',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 101,
        subcategoryName: 'Управление командой'
      }
    ],
    learnSkills: [
      {
        id: '1-learn-1',
        label: 'Маркетинг и реклама',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 102,
        subcategoryName: 'Маркетинг и реклама'
      },
      {
        id: '1-learn-2',
        label: 'Фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      },
      {
        id: '1-learn-3',
        label: 'Инвестиции',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    likesCount: 42,
    createdAt: '2026-07-10T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 101,
    subcategoryName: 'Управление командой',
    description: 'Как передавать задачи сотрудникам, сохраняя качество и соблюдая сроки выполнения проекта.',
    images: [
      'https://loremflickr.com/600/400/office,team?lock=412',
      'https://loremflickr.com/600/400/office,team?lock=8831'
    ]
  },
  {
    id: '2',
    user: {
      name: 'Елена',
      city: 'Санкт-Петербург',
      age: 29,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg'
    },
    teachSkills: [
      {
        id: '2-teach',
        label: 'Стратегия SMM продвижения',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 102,
        subcategoryName: 'Маркетинг и реклама'
      }
    ],
    learnSkills: [
      {
        id: '2-learn-1',
        label: 'Личный бренд',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 104,
        subcategoryName: 'Личный бренд'
      },
      {
        id: '2-learn-2',
        label: 'Испанский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 303,
        subcategoryName: 'Испанский'
      }
    ],
    likesCount: 38,
    createdAt: '2026-07-06T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 102,
    subcategoryName: 'Маркетинг и реклама',
    description: 'Разработка контент-плана и выбор каналов коммуникации для привлечения целевой аудитории.',
    images: [
      'https://loremflickr.com/600/400/marketing,web?lock=519',
      'https://loremflickr.com/600/400/marketing,web?lock=1054'
    ]
  },
  {
    id: '3',
    user: {
      name: 'Дмитрий',
      city: 'Казань',
      age: 38,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg'
    },
    teachSkills: [
      {
        id: '3-teach',
        label: 'Работа с возражениями',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 103,
        subcategoryName: 'Продажи и переговоры'
      }
    ],
    learnSkills: [
      {
        id: '3-learn-1',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      },
      {
        id: '3-learn-2',
        label: 'Предпринимательство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    likesCount: 35,
    createdAt: '2026-07-02T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 103,
    subcategoryName: 'Продажи и переговоры',
    description: 'Психологические приемы и речевые модули для успешного завершения сложных сделок.',
    images: [
      'https://loremflickr.com/600/400/meeting,talk?lock=4401',
      'https://loremflickr.com/600/400/meeting,talk?lock=912'
    ]
  },
  {
    id: '4',
    user: {
      name: 'Ольга',
      city: 'Новосибирск',
      age: 31,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg'
    },
    teachSkills: [
      {
        id: '4-teach',
        label: 'Позиционирование эксперта',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 104,
        subcategoryName: 'Личный бренд'
      }
    ],
    learnSkills: [
      {
        id: '4-learn-1',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '4-learn-2',
        label: 'Йога',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      },
      {
        id: '4-learn-3',
        label: 'Дизайн',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      },
      {
        id: '4-learn-4',
        label: 'Копирайтинг',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 206,
        subcategoryName: 'Креативное письмо'
      }
    ],
    likesCount: 31,
    createdAt: '2026-06-28T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 104,
    subcategoryName: 'Личный бренд',
    description: 'Создание узнаваемого образа в профессиональной среде и социальных сетях.',
    images: [
      'https://loremflickr.com/600/400/branding,business?lock=627',
      'https://loremflickr.com/600/400/branding,business?lock=338'
    ]
  },
  {
    id: '5',
    user: {
      name: 'Артем',
      city: 'Екатеринбург',
      age: 27,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/5.jpg'
    },
    teachSkills: [
      {
        id: '5-teach',
        label: 'Самопрезентация на интервью',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 105,
        subcategoryName: 'Резюме и собеседование'
      }
    ],
    learnSkills: [
      {
        id: '5-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '5-learn-2',
        label: 'Проектное управление',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 107,
        subcategoryName: 'Проектное управление'
      }
    ],
    likesCount: 28,
    createdAt: '2026-06-24T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 105,
    subcategoryName: 'Резюме и собеседование',
    description: 'Подготовка ответов на сложные вопросы и правила оформления продающего резюме.',
    images: [
      'https://loremflickr.com/600/400/interview,job?lock=7150',
      'https://loremflickr.com/600/400/interview,job?lock=248'
    ]
  },
  {
    id: '6',
    user: {
      name: 'Марина',
      city: 'Нижний Новгород',
      age: 34,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/6.jpg'
    },
    teachSkills: [
      {
        id: '6-teach',
        label: 'Матрица Эйзенхауэра в жизни',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      }
    ],
    learnSkills: [
      {
        id: '6-learn-1',
        label: 'Рисование и иллюстрация',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      },
      {
        id: '6-learn-2',
        label: 'Кулинария',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 503,
        subcategoryName: 'Приготовление еды'
      }
    ],
    likesCount: 25,
    createdAt: '2026-06-25T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 106,
    subcategoryName: 'Тайм-менеджмент',
    description: 'Приоритизация задач по важности и срочности для повышения личной продуктивности.',
    images: [
      'https://loremflickr.com/600/400/clock,watch?lock=1109',
      'https://loremflickr.com/600/400/clock,watch?lock=82'
    ]
  },
  {
    id: '7',
    user: {
      name: 'Сергей',
      city: 'Челябинск',
      age: 41,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/7.jpg'
    },
    teachSkills: [
      {
        id: '7-teach',
        label: 'Методология Scrum',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 107,
        subcategoryName: 'Проектное управление'
      }
    ],
    learnSkills: [
      {
        id: '7-learn-1',
        label: 'Немецкий',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 304,
        subcategoryName: 'Немецкий'
      },
      {
        id: '7-learn-2',
        label: 'Гитара',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 204,
        subcategoryName: 'Музыка и звук'
      },
      {
        id: '7-learn-3',
        label: 'Ораторское искусство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 205,
        subcategoryName: 'Актёрское мастерство'
      }
    ],
    likesCount: 22,
    createdAt: '2026-06-21T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 107,
    subcategoryName: 'Проектное управление',
    description: 'Основы гибкого управления проектами: спринты, ретроспективы и работа в бэклоге.',
    images: [
      'https://loremflickr.com/600/400/planning,board?lock=3051',
      'https://loremflickr.com/600/400/planning,board?lock=819'
    ]
  },
  {
    id: '8',
    user: {
      name: 'Татьяна',
      city: 'Самара',
      age: 32,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/8.jpg'
    },
    teachSkills: [
      {
        id: '8-teach',
        label: 'Запуск стартапа с нуля',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    learnSkills: [
      {
        id: '8-learn-1',
        label: 'Финансовая грамотность',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 502,
        subcategoryName: 'Домашние финансы'
      },
      {
        id: '8-learn-2',
        label: 'Арт-терапия',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 207,
        subcategoryName: 'Арт-терапия'
      }
    ],
    likesCount: 19,
    createdAt: '2026-06-17T00:00:00.000Z',
    categoryId: 1,
    categoryName: 'Бизнес и карьера',
    subcategoryId: 108,
    subcategoryName: 'Предпринимательство',
    description: 'Поиск бизнес-идеи, анализ рынка и выбор оптимальной модели монетизации.',
    images: [
      'https://loremflickr.com/600/400/startup,office?lock=5542',
      'https://loremflickr.com/600/400/startup,office?lock=730'
    ]
  },
  {
    id: '9',
    user: {
      name: 'Алексей',
      city: 'Омск',
      age: 25,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/9.jpg'
    },
    teachSkills: [
      {
        id: '9-teach',
        label: 'Анатомическое рисование',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      }
    ],
    learnSkills: [
      {
        id: '9-learn-1',
        label: 'Японский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 306,
        subcategoryName: 'Японский'
      },
      {
        id: '9-learn-2',
        label: 'Видеомонтаж',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 203,
        subcategoryName: 'Видеомонтаж'
      }
    ],
    likesCount: 17,
    createdAt: '2026-06-13T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 201,
    subcategoryName: 'Рисование и иллюстрация',
    description: 'Изучение пропорций человеческого тела и построение динамичных поз персонажей.',
    images: [
      'https://loremflickr.com/600/400/drawing,art?lock=890',
      'https://loremflickr.com/600/400/drawing,art?lock=4127'
    ]
  },
  {
    id: '10',
    user: {
      name: 'Светлана',
      city: 'Ростов-на-Дону',
      age: 36,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/10.jpg'
    },
    teachSkills: [
      {
        id: '10-teach',
        label: 'Студийный свет и портрет',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      }
    ],
    learnSkills: [
      {
        id: '10-learn-1',
        label: 'Французский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 302,
        subcategoryName: 'Французский'
      },
      {
        id: '10-learn-2',
        label: 'Личностное развитие',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Личностное развитие'
      }
    ],
    likesCount: 15,
    createdAt: '2026-06-09T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 202,
    subcategoryName: 'Фотография',
    description: 'Работа с импульсными источниками света и основы композиции классического портрета.',
    images: [
      'https://loremflickr.com/600/400/photography,studio?lock=1672',
      'https://loremflickr.com/600/400/photography,studio?lock=530'
    ]
  },
  {
    id: '11',
    user: {
      name: 'Михаил',
      city: 'Уфа',
      age: 28,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/11.jpg'
    },
    teachSkills: [
      {
        id: '11-teach',
        label: 'Цветокоррекция в видео',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 203,
        subcategoryName: 'Видеомонтаж'
      }
    ],
    learnSkills: [
      {
        id: '11-learn-1',
        label: 'Музыка и звук',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 204,
        subcategoryName: 'Музыка и звук'
      },
      {
        id: '11-learn-2',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '11-learn-3',
        label: '3D-моделирование',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: '3D-моделирование'
      },
      {
        id: '11-learn-4',
        label: 'SMM',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'SMM'
      }
    ],
    likesCount: 14,
    createdAt: '2026-06-10T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 203,
    subcategoryName: 'Видеомонтаж',
    description: 'Настройка баланса белого, работа с кривыми и создание кинематографичной картинки.',
    images: [
      'https://loremflickr.com/600/400/video,editor?lock=7022',
      'https://loremflickr.com/600/400/video,editor?lock=918'
    ]
  },
  {
    id: '12',
    user: {
      name: 'Анна',
      city: 'Красноярск',
      age: 24,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/12.jpg'
    },
    teachSkills: [
      {
        id: '12-teach',
        label: 'Основы саунд-дизайна',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 204,
        subcategoryName: 'Музыка и звук'
      }
    ],
    learnSkills: [
      {
        id: '12-learn-1',
        label: 'Программирование',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Программирование'
      },
      {
        id: '12-learn-2',
        label: 'Китайский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 305,
        subcategoryName: 'Китайский'
      }
    ],
    likesCount: 13,
    createdAt: '2026-06-06T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 204,
    subcategoryName: 'Музыка и звук',
    description: 'Создание уникальных звуковых эффектов и работа с синтезаторами в цифровых аудиостанциях.',
    images: [
      'https://loremflickr.com/600/400/music,audio?lock=2283',
      'https://loremflickr.com/600/400/music,audio?lock=640'
    ]
  },
  {
    id: '13',
    user: {
      name: 'Павел',
      city: 'Воронеж',
      age: 42,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/13.jpg'
    },
    teachSkills: [
      {
        id: '13-teach',
        label: 'Ораторское мастерство',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Актерское мастерство'
      }
    ],
    learnSkills: [
      {
        id: '13-learn-1',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      },
      {
        id: '13-learn-2',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      }
    ],
    likesCount: 12,
    createdAt: '2026-06-02T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Творчество и искусство',
    subcategoryId: 401,
    subcategoryName: 'Актерское мастерство',
    description: 'Развитие дикции, работа с голосом и техника уверенного поведения перед аудиторией.',
    images: [
      'https://loremflickr.com/600/400/acting,theater?lock=835',
      'https://loremflickr.com/600/400/acting,theater?lock=194'
    ]
  },
  {
    id: '14',
    user: {
      name: 'Ирина',
      city: 'Пермь',
      age: 31,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/14.jpg'
    },
    teachSkills: [
      {
        id: '14-teach',
        label: 'Сторителлинг в тексте',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 206,
        subcategoryName: 'Креативное письмо'
      }
    ],
    learnSkills: [
      {
        id: '14-learn-1',
        label: 'Испанский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 303,
        subcategoryName: 'Испанский'
      },
      {
        id: '14-learn-2',
        label: 'Фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      }
    ],
    likesCount: 11,
    createdAt: '2026-05-29T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 206,
    subcategoryName: 'Креативное письмо',
    description: 'Как выстраивать структуру сюжета и создавать живых персонажей в художественных текстах.',
    images: [
      'https://loremflickr.com/600/400/writing,book?lock=5091',
      'https://loremflickr.com/600/400/writing,book?lock=371'
    ]
  },
  {
    id: '15',
    user: {
      name: 'Константин',
      city: 'Волгоград',
      age: 36,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/15.jpg'
    },
    teachSkills: [
      {
        id: '15-teach',
        label: 'Метафорические карты в искусстве',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 207,
        subcategoryName: 'Арт-терапия'
      }
    ],
    learnSkills: [
      {
        id: '15-learn-1',
        label: 'Медитация',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      },
      {
        id: '15-learn-2',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '15-learn-3',
        label: 'Финансовая грамотность',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 502,
        subcategoryName: 'Домашние финансы'
      }
    ],
    likesCount: 10,
    createdAt: '2026-05-25T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 207,
    subcategoryName: 'Арт-терапия',
    description: 'Использование визуальных образов для понимания внутренних переживаний и поиска ресурсов.',
    images: [
      'https://loremflickr.com/600/400/art,abstract?lock=910',
      'https://loremflickr.com/600/400/art,abstract?lock=285'
    ]
  },
  {
    id: '16',
    user: {
      name: 'Наталья',
      city: 'Краснодар',
      age: 27,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/16.jpg'
    },
    teachSkills: [
      {
        id: '16-teach',
        label: 'Создание интерьерных свечей',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 208,
        subcategoryName: 'Декор и DIY'
      }
    ],
    learnSkills: [
      {
        id: '16-learn-1',
        label: 'Маркетинг и реклама',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 102,
        subcategoryName: 'Маркетинг и реклама'
      },
      {
        id: '16-learn-2',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      }
    ],
    likesCount: 9,
    createdAt: '2026-05-26T00:00:00.000Z',
    categoryId: 2,
    categoryName: 'Творчество и искусство',
    subcategoryId: 208,
    subcategoryName: 'Декор и DIY',
    description: 'Технология работы с воском, подбор ароматов и декорирование готовых изделий.',
    images: [
      'https://loremflickr.com/600/400/decor,home?lock=6132',
      'https://loremflickr.com/600/400/decor,home?lock=820'
    ]
  },
  {
    id: '17',
    user: {
      name: 'Виктор',
      city: 'Саратов',
      age: 34,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/17.jpg'
    },
    teachSkills: [
      {
        id: '17-teach',
        label: 'Разговорный английский',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      }
    ],
    learnSkills: [
      {
        id: '17-learn-1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Игра на барабанах'
      },
      {
        id: '17-learn-2',
        label: 'Управление командой',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 101,
        subcategoryName: 'Управление командой'
      }
    ],
    likesCount: 8,
    createdAt: '2026-05-22T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 301,
    subcategoryName: 'Английский',
    description: 'Преодоление языкового барьера, расширение словарного запаса и понимание на слух.',
    images: [
      'https://loremflickr.com/600/400/language,english?lock=470',
      'https://loremflickr.com/600/400/language,english?lock=159'
    ]
  },
  {
    id: '18',
    user: {
      name: 'София',
      city: 'Тюмень',
      age: 29,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/18.jpg'
    },
    teachSkills: [
      {
        id: '18-teach',
        label: 'Французский для общения',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 302,
        subcategoryName: 'Французский'
      }
    ],
    learnSkills: [
      {
        id: '18-learn-1',
        label: 'Рисование и иллюстрация',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      },
      {
        id: '18-learn-2',
        label: 'Йога',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      },
      {
        id: '18-learn-3',
        label: 'Дизайн интерьера',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Дизайн интерьера'
      }
    ],
    likesCount: 7,
    createdAt: '2026-05-18T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 302,
    subcategoryName: 'Французский',
    description: 'Основы грамматики и лексики для поддержания диалогов на повседневные темы.',
    images: [
      'https://loremflickr.com/600/400/france,travel?lock=381',
      'https://loremflickr.com/600/400/france,travel?lock=702'
    ]
  },
  {
    id: '19',
    user: {
      name: 'Андрей',
      city: 'Тольятти',
      age: 38,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/19.jpg'
    },
    teachSkills: [
      {
        id: '19-teach',
        label: 'Испанский с нуля',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 303,
        subcategoryName: 'Испанский'
      }
    ],
    learnSkills: [
      {
        id: '19-learn-1',
        label: 'Фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      },
      {
        id: '19-learn-2',
        label: 'Предпринимательство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    likesCount: 6,
    createdAt: '2026-05-14T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 303,
    subcategoryName: 'Испанский',
    description: 'Изучение базовых правил чтения, спряжения глаголов и основ повседневной речи.',
    images: [
      'https://loremflickr.com/600/400/spain,language?lock=8921',
      'https://loremflickr.com/600/400/spain,language?lock=410'
    ]
  },
  {
    id: '20',
    user: {
      name: 'Юлия',
      city: 'Ижевск',
      age: 32,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/20.jpg'
    },
    teachSkills: [
      {
        id: '20-teach',
        label: 'Немецкий для переезда',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 304,
        subcategoryName: 'Немецкий'
      }
    ],
    learnSkills: [
      {
        id: '20-learn-1',
        label: 'Видеомонтаж',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 203,
        subcategoryName: 'Видеомонтаж'
      },
      {
        id: '20-learn-2',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      }
    ],
    likesCount: 5,
    createdAt: '2026-05-10T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 304,
    subcategoryName: 'Немецкий',
    description: 'Специфическая лексика для административных вопросов и интеграции в немецкоязычную среду.',
    images: [
      'https://loremflickr.com/600/400/germany,books?lock=2607',
      'https://loremflickr.com/600/400/germany,books?lock=931'
    ]
  },
  {
    id: '21',
    user: {
      name: 'Денис',
      city: 'Барнаул',
      age: 34,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/21.jpg'
    },
    teachSkills: [
      {
        id: '21-teach',
        label: 'Каллиграфия иероглифов',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 305,
        subcategoryName: 'Китайский'
      }
    ],
    learnSkills: [
      {
        id: '21-learn-1',
        label: 'Японский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 306,
        subcategoryName: 'Японский'
      },
      {
        id: '21-learn-2',
        label: 'Проектное управление',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 107,
        subcategoryName: 'Проектное управление'
      }
    ],
    likesCount: 18,
    createdAt: '2026-05-11T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 305,
    subcategoryName: 'Китайский',
    description: 'Основы написания черт, порядок их нанесения и изучение ключей китайского языка.',
    images: [
      'https://loremflickr.com/600/400/china,writing?lock=571',
      'https://loremflickr.com/600/400/china,writing?lock=184'
    ]
  },
  {
    id: '22',
    user: {
      name: 'Алла',
      city: 'Ульяновск',
      age: 26,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/22.jpg'
    },
    teachSkills: [
      {
        id: '22-teach',
        label: 'Базовый японский',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 306,
        subcategoryName: 'Японский'
      }
    ],
    learnSkills: [
      {
        id: '22-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '22-learn-2',
        label: 'Дизайн',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      }
    ],
    likesCount: 16,
    createdAt: '2026-05-07T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 306,
    subcategoryName: 'Японский',
    description: 'Изучение азбук хирагана и катакана, а также простых разговорных конструкций.',
    images: [
      'https://loremflickr.com/600/400/japan,culture?lock=7492',
      'https://loremflickr.com/600/400/japan,culture?lock=620'
    ]
  },
  {
    id: '23',
    user: {
      name: 'Иван',
      city: 'Иркутск',
      age: 32,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/23.jpg'
    },
    teachSkills: [
      {
        id: '23-teach',
        label: 'Подготовка к IELTS Writing',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 307,
        subcategoryName: 'Подготовка к экзаменам (IELTS, TOEFL)'
      }
    ],
    learnSkills: [
      {
        id: '23-learn-1',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      },
      {
        id: '23-learn-2',
        label: 'Предпринимательство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      },
      {
        id: '23-learn-3',
        label: 'Программирование',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Программирование'
      },
      {
        id: '23-learn-4',
        label: 'Ораторское искусство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 205,
        subcategoryName: 'Актёрское мастерство'
      }
    ],
    likesCount: 24,
    createdAt: '2026-05-03T00:00:00.000Z',
    categoryId: 3,
    categoryName: 'Иностранные языки',
    subcategoryId: 307,
    subcategoryName: 'Подготовка к экзаменам (IELTS, TOEFL)',
    description: 'Разбор структуры эссе и описание графиков для получения высокого балла на экзамене.',
    images: [
      'https://loremflickr.com/600/400/test,student?lock=1083',
      'https://loremflickr.com/600/400/test,student?lock=593'
    ]
  },
  {
    id: '24',
    user: {
      name: 'Виктория',
      city: 'Хабаровск',
      age: 35,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/24.jpg'
    },
    teachSkills: [
      {
        id: '24-teach',
        label: 'Эмоциональный интеллект',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Личностное развитие'
      }
    ],
    learnSkills: [
      {
        id: '24-learn-1',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '24-learn-2',
        label: 'Йога',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      }
    ],
    likesCount: 27,
    createdAt: '2026-04-29T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 401,
    subcategoryName: 'Личностное развитие',
    description: 'Навыки распознавания собственных эмоций и управления ими в стрессовых ситуациях.',
    images: [
      'https://loremflickr.com/600/400/people,calm?lock=825',
      'https://loremflickr.com/600/400/people,calm?lock=401'
    ]
  },
  {
    id: '25',
    user: {
      name: 'Максим',
      city: 'Владивосток',
      age: 24,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/25.jpg'
    },
    teachSkills: [
      {
        id: '25-teach',
        label: 'Эффективное конспектирование',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 402,
        subcategoryName: 'Навыки обучения'
      }
    ],
    learnSkills: [
      {
        id: '25-learn-1',
        label: 'Программирование',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Программирование'
      },
      {
        id: '25-learn-2',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      }
    ],
    likesCount: 33,
    createdAt: '2026-04-25T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 402,
    subcategoryName: 'Навыки обучения',
    description: 'Освоение метода Корнелла и интеллект-карт для лучшего усвоения лекционного материала.',
    images: [
      'https://loremflickr.com/600/400/notes,pen?lock=3609',
      'https://loremflickr.com/600/400/notes,pen?lock=719'
    ]
  },
  {
    id: '26',
    user: {
      name: 'Ольга',
      city: 'Махачкала',
      age: 39,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/26.jpg'
    },
    teachSkills: [
      {
        id: '26-teach',
        label: 'Развитие системного мышления',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 403,
        subcategoryName: 'Когнитивные техники'
      }
    ],
    learnSkills: [
      {
        id: '26-learn-1',
        label: 'Финансовая грамотность',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 502,
        subcategoryName: 'Домашние финансы'
      },
      {
        id: '26-learn-2',
        label: 'Иностранные языки',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Иностранные языки'
      }
    ],
    likesCount: 21,
    createdAt: '2026-04-26T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 403,
    subcategoryName: 'Когнитивные техники',
    description: 'Методы анализа сложных связей и поиск причинно-следственных паттернов в информации.',
    images: [
      'https://loremflickr.com/600/400/logic,brain?lock=501',
      'https://loremflickr.com/600/400/logic,brain?lock=1472'
    ]
  },
  {
    id: '27',
    user: {
      name: 'Роман',
      city: 'Томск',
      age: 31,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/27.jpg'
    },
    teachSkills: [
      {
        id: '27-teach',
        label: 'Техники быстрого чтения',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 404,
        subcategoryName: 'Скорочтение'
      }
    ],
    learnSkills: [
      {
        id: '27-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '27-learn-2',
        label: 'Личный бренд',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 104,
        subcategoryName: 'Личный бренд'
      },
      {
        id: '27-learn-3',
        label: 'Аналитика данных',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Аналитика данных'
      }
    ],
    likesCount: 20,
    createdAt: '2026-04-22T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 404,
    subcategoryName: 'Скорочтение',
    description: 'Устранение артикуляции и расширение поля зрения для увеличения скорости обработки текстов.',
    images: [
      'https://loremflickr.com/600/400/reading,fast?lock=893',
      'https://loremflickr.com/600/400/reading,fast?lock=3027'
    ]
  },
  {
    id: '28',
    user: {
      name: 'Елена',
      city: 'Оренбург',
      age: 37,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/28.jpg'
    },
    teachSkills: [
      {
        id: '28-teach',
        label: 'Педагогический дизайн',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 405,
        subcategoryName: 'Навыки преподавания'
      }
    ],
    learnSkills: [
      {
        id: '28-learn-1',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '28-learn-2',
        label: 'Медитация',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      }
    ],
    likesCount: 26,
    createdAt: '2026-04-18T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 405,
    subcategoryName: 'Навыки преподавания',
    description: 'Как структурировать учебный материал, чтобы он был понятным и вовлекающим для студентов.',
    images: [
      'https://loremflickr.com/600/400/teaching,teacher?lock=610',
      'https://loremflickr.com/600/400/teaching,teacher?lock=4812'
    ]
  },
  {
    id: '29',
    user: {
      name: 'Игорь',
      city: 'Кемерово',
      age: 44,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/29.jpg'
    },
    teachSkills: [
      {
        id: '29-teach',
        label: 'Карьерный коучинг',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 406,
        subcategoryName: 'Коучинг'
      }
    ],
    learnSkills: [
      {
        id: '29-learn-1',
        label: 'Личностное развитие',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Личностное развитие'
      },
      {
        id: '29-learn-2',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      }
    ],
    likesCount: 29,
    createdAt: '2026-04-14T00:00:00.000Z',
    categoryId: 4,
    categoryName: 'Образование и развитие',
    subcategoryId: 406,
    subcategoryName: 'Коучинг',
    description: 'Техники постановки карьерных целей и разработки пошагового плана их достижения.',
    images: [
      'https://loremflickr.com/600/400/success,goal?lock=193',
      'https://loremflickr.com/600/400/success,goal?lock=5201'
    ]
  },
  {
    id: '30',
    user: {
      name: 'Марина',
      city: 'Новокузнецк',
      age: 31,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/30.jpg'
    },
    teachSkills: [
      {
        id: '30-teach',
        label: 'Магическая уборка по КонМари',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 501,
        subcategoryName: 'Уборка и организация'
      }
    ],
    learnSkills: [
      {
        id: '30-learn-1',
        label: 'Арт-терапия',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 207,
        subcategoryName: 'Арт-терапия'
      },
      {
        id: '30-learn-2',
        label: 'Личный бренд',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 104,
        subcategoryName: 'Личный бренд'
      }
    ],
    likesCount: 30,
    createdAt: '2026-04-10T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 501,
    subcategoryName: 'Уборка и организация',
    description: 'Принципы избавления от лишнего и создания системы порядка, которую легко поддерживать.',
    images: [
      'https://loremflickr.com/600/400/home,cleaning?lock=804',
      'https://loremflickr.com/600/400/home,cleaning?lock=1652'
    ]
  },
  {
    id: '31',
    user: {
      name: 'Артем',
      city: 'Рязань',
      age: 29,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/31.jpg'
    },
    teachSkills: [
      {
        id: '31-teach',
        label: 'Инвестиции для начинающих',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 502,
        subcategoryName: 'Домашние финансы'
      }
    ],
    learnSkills: [
      {
        id: '31-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '31-learn-2',
        label: 'Предпринимательство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    likesCount: 34,
    createdAt: '2026-04-11T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 502,
    subcategoryName: 'Домашние финансы',
    description: 'Как начать формировать капитал, разобраться в акциях и управлять личным бюджетом.',
    images: [
      'https://loremflickr.com/600/400/money,wallet?lock=371',
      'https://loremflickr.com/600/400/money,wallet?lock=9241'
    ]
  },
  {
    id: '32',
    user: {
      name: 'Наталья',
      city: 'Астрахань',
      age: 35,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/32.jpg'
    },
    teachSkills: [
      {
        id: '32-teach',
        label: 'Итальянская кухня дома',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 503,
        subcategoryName: 'Приготовление еды'
      }
    ],
    learnSkills: [
      {
        id: '32-learn-1',
        label: 'Французский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 302,
        subcategoryName: 'Французский'
      },
      {
        id: '32-learn-2',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '32-learn-3',
        label: 'Фуд-фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Фуд-фотография'
      },
      {
        id: '32-learn-4',
        label: 'Копирайтинг',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 206,
        subcategoryName: 'Креативное письмо'
      }
    ],
    likesCount: 36,
    createdAt: '2026-04-07T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 503,
    subcategoryName: 'Приготовление еды',
    description: 'Рецепты пасты, ризотто и соусов, которые помогут воссоздать вкус Италии на своей кухне.',
    images: [
      'https://loremflickr.com/600/400/cooking,pasta?lock=582',
      'https://loremflickr.com/600/400/cooking,pasta?lock=4037'
    ]
  },
  {
    id: '33',
    user: {
      name: 'Дмитрий',
      city: 'Пенза',
      age: 28,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/33.jpg'
    },
    teachSkills: [
      {
        id: '33-teach',
        label: 'Флористика для дома',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 504,
        subcategoryName: 'Домашние растения'
      }
    ],
    learnSkills: [
      {
        id: '33-learn-1',
        label: 'Фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      },
      {
        id: '33-learn-2',
        label: 'Управление командой',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 101,
        subcategoryName: 'Управление командой'
      }
    ],
    likesCount: 37,
    createdAt: '2026-04-03T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 504,
    subcategoryName: 'Домашние растения',
    description: 'Правила сочетания цветов в букетах и секреты долгой жизни срезанных растений.',
    images: [
      'https://loremflickr.com/600/400/flowers,pot?lock=219',
      'https://loremflickr.com/600/400/flowers,pot?lock=7604'
    ]
  },
  {
    id: '34',
    user: {
      name: 'Елена',
      city: 'Набережные Челны',
      age: 38,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/34.jpg'
    },
    teachSkills: [
      {
        id: '34-teach',
        label: 'Мелкий бытовой ремонт',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 505,
        subcategoryName: 'Ремонт'
      }
    ],
    learnSkills: [
      {
        id: '34-learn-1',
        label: 'Рисование и иллюстрация',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 201,
        subcategoryName: 'Рисование и иллюстрация'
      },
      {
        id: '34-learn-2',
        label: 'Йога',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      }
    ],
    likesCount: 39,
    createdAt: '2026-03-30T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 505,
    subcategoryName: 'Ремонт',
    description: 'Навыки работы с базовыми инструментами для починки мебели и замены сантехники.',
    images: [
      'https://loremflickr.com/600/400/tools,repair?lock=630',
      'https://loremflickr.com/600/400/tools,repair?lock=1582'
    ]
  },
  {
    id: '35',
    user: {
      name: 'Максим',
      city: 'Липецк',
      age: 34,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/35.jpg'
    },
    teachSkills: [
      {
        id: '35-teach',
        label: 'Организация гардероба',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 5,
        categoryName: 'Дом и уют',
        subcategoryId: 506,
        subcategoryName: 'Хранение вещей'
      }
    ],
    learnSkills: [
      {
        id: '35-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '35-learn-2',
        label: 'Личностное развитие',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Личностное развитие'
      }
    ],
    likesCount: 40,
    createdAt: '2026-03-26T00:00:00.000Z',
    categoryId: 5,
    categoryName: 'Дом и уют',
    subcategoryId: 506,
    subcategoryName: 'Хранение вещей',
    description: 'Эффективные методы хранения одежды в маленьких пространствах и сортировка по категориям.',
    images: [
      'https://loremflickr.com/600/400/closet,clothes?lock=904',
      'https://loremflickr.com/600/400/closet,clothes?lock=3821'
    ]
  },
  {
    id: '36',
    user: {
      name: 'Юлия',
      city: 'Тула',
      age: 30,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/36.jpg'
    },
    teachSkills: [
      {
        id: '36-teach',
        label: 'Медитация для сна',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 601,
        subcategoryName: 'Йога и медитация'
      }
    ],
    learnSkills: [
      {
        id: '36-learn-1',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      },
      {
        id: '36-learn-2',
        label: 'Французский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 302,
        subcategoryName: 'Французский'
      },
      {
        id: '36-learn-3',
        label: 'Креативное письмо',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 206,
        subcategoryName: 'Креативное письмо'
      }
    ],
    likesCount: 41,
    createdAt: '2026-03-27T00:00:00.000Z',
    categoryId: 6,
    categoryName: 'Здоровье и лайфстайл',
    subcategoryId: 601,
    subcategoryName: 'Йога и медитация',
    description: 'Дыхательные практики и техники расслабления для глубокого и качественного отдыха ночью.',
    images: [
      'https://loremflickr.com/600/400/yoga,relax?lock=451',
      'https://loremflickr.com/600/400/yoga,relax?lock=8074'
    ]
  },
  {
    id: '37',
    user: {
      name: 'Артем',
      city: 'Киров',
      age: 37,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/37.jpg'
    },
    teachSkills: [
      {
        id: '37-teach',
        label: 'Основы нутрициологии',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 602,
        subcategoryName: 'Питание и ЗОЖ'
      }
    ],
    learnSkills: [
      {
        id: '37-learn-1',
        label: 'Испанский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 303,
        subcategoryName: 'Испанский'
      },
      {
        id: '37-learn-2',
        label: 'Предпринимательство',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 108,
        subcategoryName: 'Предпринимательство'
      }
    ],
    likesCount: 43,
    createdAt: '2026-03-23T00:00:00.000Z',
    categoryId: 6,
    categoryName: 'Здоровье и лайфстайл',
    subcategoryId: 602,
    subcategoryName: 'Питание и ЗОЖ',
    description: 'Как составить сбалансированный рацион и разобраться в белках, жирах и углеводах.',
    images: [
      'https://loremflickr.com/600/400/healthy,food?lock=720',
      'https://loremflickr.com/600/400/healthy,food?lock=2945'
    ]
  },
  {
    id: '38',
    user: {
      name: 'Светлана',
      city: 'Чебоксары',
      age: 35,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/38.jpg'
    },
    teachSkills: [
      {
        id: '38-teach',
        label: 'Проработка тревожности',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      }
    ],
    learnSkills: [
      {
        id: '38-learn-1',
        label: 'Арт-терапия',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 207,
        subcategoryName: 'Арт-терапия'
      },
      {
        id: '38-learn-2',
        label: 'Тайм-менеджмент',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 106,
        subcategoryName: 'Тайм-менеджмент'
      }
    ],
    likesCount: 44,
    createdAt: '2026-03-19T00:00:00.000Z',
    categoryId: 6,
    categoryName: 'Здоровье и лайфстайл',
    subcategoryId: 603,
    subcategoryName: 'Ментальное здоровье',
    description: 'Упражнения из когнитивно-поведенческой терапии для снижения уровня стресса.',
    images: [
      'https://loremflickr.com/600/400/calm,sky?lock=139',
      'https://loremflickr.com/600/400/calm,sky?lock=6527'
    ]
  },
  {
    id: '39',
    user: {
      name: 'Иван',
      city: 'Калининград',
      age: 33,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/39.jpg'
    },
    teachSkills: [
      {
        id: '39-teach',
        label: 'Практика осознанности',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 604,
        subcategoryName: 'Осознанность'
      }
    ],
    learnSkills: [
      {
        id: '39-learn-1',
        label: 'Английский',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 301,
        subcategoryName: 'Английский'
      },
      {
        id: '39-learn-2',
        label: 'Фотография',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 2,
        categoryName: 'Творчество и искусство',
        subcategoryId: 202,
        subcategoryName: 'Фотография'
      }
    ],
    likesCount: 45,
    createdAt: '2026-03-15T00:00:00.000Z',
    categoryId: 6,
    categoryName: 'Здоровье и лайфстайл',
    subcategoryId: 604,
    subcategoryName: 'Осознанность',
    description: 'Методики фокусировки внимания на текущем моменте для улучшения концентрации.',
    images: [
      'https://loremflickr.com/600/400/zen,nature?lock=840',
      'https://loremflickr.com/600/400/zen,nature?lock=3175'
    ]
  },
  {
    id: '40',
    user: {
      name: 'Елена',
      city: 'Брянск',
      age: 29,
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg'
    },
    teachSkills: [
      {
        id: '40-teach',
        label: 'Функциональный тренинг',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 605,
        subcategoryName: 'Физические тренировки'
      }
    ],
    learnSkills: [
      {
        id: '40-learn-1',
        label: 'Немецкий',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 3,
        categoryName: 'Иностранные языки',
        subcategoryId: 304,
        subcategoryName: 'Немецкий'
      },
      {
        id: '40-learn-2',
        label: 'Личный бренд',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 1,
        categoryName: 'Бизнес и карьера',
        subcategoryId: 104,
        subcategoryName: 'Личный бренд'
      },
      {
        id: '40-learn-3',
        label: 'Нутрициология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 4,
        categoryName: 'Образование и развитие',
        subcategoryId: 401,
        subcategoryName: 'Нутрициология'
      },
      {
        id: '40-learn-4',
        label: 'Психология',
        bgColorFromDb: '#e9f7e7',
        textColorFromDb: '#253017',
        categoryId: 6,
        categoryName: 'Здоровье и лайфстайл',
        subcategoryId: 603,
        subcategoryName: 'Ментальное здоровье'
      }
    ],
    likesCount: 46,
    createdAt: '2026-03-11T00:00:00.000Z',
    categoryId: 6,
    categoryName: 'Здоровье и лайфстайл',
    subcategoryId: 605,
    subcategoryName: 'Физические тренировки',
    description: 'Комплекс упражнений для развития выносливости, силы и координации движений.',
    images: [
      'https://loremflickr.com/600/400/fitness,gym?lock=592',
      'https://loremflickr.com/600/400/fitness,gym?lock=1481'
    ]
  }
]
