// --- ТИПЫ ДЛЯ КАРТОЧЕК И ФИЛЬТРОВ ---
export interface ChipItem {
  id: string | number
  label: string
  bgColorFromDb?: string
  textColorFromDb?: string
}

export interface SkillSectionCard {
  id: string
  user: {
    name: string
    city: string
    age: number
    avatar?: string
  }
  teachSkills: ChipItem[]
  learnSkills: ChipItem[]
}

export interface SubCategory {
  id: number
  name: string
}

export interface SkillCategory {
  id: number
  name: string
  iconKey: string
  subCategories: SubCategory[]
}

// --- 1. МОКИ ДЛЯ РЕНДЕРА САЙДБАРА ФИЛЬТРОВ ---
export const MOCK_FILTER_CATEGORIES: SkillCategory[] = [
  {
    id: 1,
    name: 'Бизнес и карьера',
    iconKey: 'briefcase',
    subCategories: [
      { id: 101, name: 'Управление командой' },
      { id: 102, name: 'Маркетинг и реклама' },
      { id: 106, name: 'Тайм-менеджмент' },
    ],
  },
  {
    id: 2,
    name: 'Творчество и искусство',
    iconKey: 'palette',
    subCategories: [
      { id: 201, name: 'Рисование и иллюстрация' },
      { id: 202, name: 'Фотография' },
    ],
  },
  {
    id: 3,
    name: 'Иностранные языки',
    iconKey: 'global',
    subCategories: [{ id: 301, name: 'Английский' }],
  },
]

export const MOCK_FILTER_CITIES = [
  { id: '1', name: 'Москва' },
  { id: '2', name: 'Санкт-Петербург' },
  { id: '3', name: 'Новосибирск' },
  { id: '4', name: 'Екатеринбург' },
  { id: '5', name: 'Казань' },
]

// --- 2. РАСШИРЕННЫЕ МОКИ ДЛЯ КАРТОЧЕК (С заданными цветами текста и фона) ---
export const MOCK_CATALOG_DATA: SkillSectionCard[] = [
  // --- Блок для секции "Популярное" (Индексы 0-4, передадим 5 карточек при лимите 3) ---
  {
    id: '1',
    user: { name: 'Иван Петров', city: 'Санкт-Петербург', age: 34 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '2',
    user: { name: 'Анна Волкова', city: 'Казань', age: 26 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '3',
    user: { name: 'Максим', city: 'Москва', age: 23 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '4',
    user: { name: 'Сергей Новиков', city: 'Новосибирск', age: 30 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '5',
    user: { name: 'Елена Смирнова', city: 'Екатеринбург', age: 28 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },

  // --- Блок для секции "Новое" (Индексы 5-9, передадим 5 карточек при лимите 3) ---
  {
    id: '6',
    user: { name: 'Дмитрий Кузнецов', city: 'Краснодар', age: 32 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '7',
    user: { name: 'Ольга Лебедева', city: 'Сочи', age: 25 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '8',
    user: { name: 'Алексей Иванов', city: 'Владивосток', age: 29 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '9',
    user: { name: 'Наталья Попова', city: 'Пермь', age: 27 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '10',
    user: { name: 'Игорь Соколов', city: 'Нижний Новгород', age: 35 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },

  // --- Блок для секции "Рекомендуем" (Индексы 10-20, передадим 11 карточек при лимите 9) ---
  {
    id: '11',
    user: { name: 'Светлана', city: 'Санкт-Петербург', age: 24 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '12',
    user: { name: 'Павел', city: 'Казань', age: 31 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '13',
    user: { name: 'Татьяна', city: 'Самара', age: 26 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '14',
    user: { name: 'Роман', city: 'Омск', age: 33 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '15',
    user: { name: 'Мария', city: 'Челябинск', age: 23 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '16',
    user: { name: 'Владимир', city: 'Ростов-на-Дону', age: 36 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '17',
    user: { name: 'Юлия', city: 'Уфа', age: 29 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '18',
    user: { name: 'Михаил', city: 'Воронеж', age: 30 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '19',
    user: { name: 'Кристина', city: 'Пермь', age: 22 },
    teachSkills: [
      { id: 't2', label: 'Английский язык', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '20',
    user: { name: 'Артем', city: 'Ярославль', age: 25 },
    teachSkills: [
      { id: 't3', label: 'Бизнес-план', bgColorFromDb: '#f7e7f2', textColorFromDb: '#253017' },
    ],
    learnSkills: [
      { id: 'l2', label: 'Медитация', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
  {
    id: '21',
    user: { name: 'София', city: 'Волгоград', age: 28 },
    teachSkills: [
      {
        id: 't1',
        label: 'Игра на барабанах',
        bgColorFromDb: '#f7e7f2',
        textColorFromDb: '#253017',
      },
    ],
    learnSkills: [
      { id: 'l1', label: 'Тайм менеджмент', bgColorFromDb: '#e9f7e7', textColorFromDb: '#253017' },
    ],
  },
]
