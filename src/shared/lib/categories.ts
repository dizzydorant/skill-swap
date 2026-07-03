export interface SkillSubcategory {
  id: number
  name: string
  className: string
}

export interface SkillCategory {
  id: number
  name: string
  icon: string
  className: string
  subCategories: SkillSubcategory[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: 'Бизнес и карьера',
    icon: '/icons/briefcase.svg',
    className: 'category-business',
    subCategories: [
      { id: 101, name: 'Управление командой', className: 'category-business' },
      { id: 102, name: 'Маркетинг и реклама', className: 'category-business' },
      { id: 103, name: 'Продажи и переговоры', className: 'category-business' },
      { id: 104, name: 'Личный бренд', className: 'category-business' },
      { id: 105, name: 'Резюме и собеседование', className: 'category-business' },
      { id: 106, name: 'Тайм-менеджмент', className: 'category-business' },
      { id: 107, name: 'Проектное управление', className: 'category-business' },
      { id: 108, name: 'Предпринимательство', className: 'category-business' },
    ],
  },
  {
    id: 2,
    name: 'Творчество и искусство',
    icon: '/icons/palette.svg',
    className: 'category-art',
    subCategories: [
      { id: 201, name: 'Рисование и иллюстрация', className: 'category-art' },
      { id: 202, name: 'Фотография', className: 'category-art' },
      { id: 203, name: 'Видеомонтаж', className: 'category-art' },
      { id: 204, name: 'Музыка и звук', className: 'category-art' },
      { id: 205, name: 'Актёрское мастерство', className: 'category-art' },
      { id: 206, name: 'Креативное письмо', className: 'category-art' },
      { id: 207, name: 'Арт-терапия', className: 'category-art' },
      { id: 208, name: 'Декор и DIY', className: 'category-art' },
    ],
  },
  {
    id: 3,
    name: 'Иностранные языки',
    icon: '/icons/global.svg',
    className: 'category-languages',
    subCategories: [
      { id: 301, name: 'Английский', className: 'category-languages' },
      { id: 302, name: 'Французский', className: 'category-languages' },
      { id: 303, name: 'Испанский', className: 'category-languages' },
      { id: 304, name: 'Немецкий', className: 'category-languages' },
      { id: 305, name: 'Китайский', className: 'category-languages' },
      { id: 306, name: 'Японский', className: 'category-languages' },
      { id: 307, name: 'Подготовка к экзаменам (IELTS, TOEFL)', className: 'category-languages' },
    ],
  },
  {
    id: 4,
    name: 'Образование и развитие',
    icon: '/icons/book.svg',
    className: 'category-education',
    subCategories: [
      { id: 401, name: 'Личностное развитие', className: 'category-education' },
      { id: 402, name: 'Навыки обучения', className: 'category-education' },
      { id: 403, name: 'Когнитивные техники', className: 'category-education' },
      { id: 404, name: 'Скорочтение', className: 'category-education' },
      { id: 405, name: 'Навыки преподавания', className: 'category-education' },
      { id: 406, name: 'Коучинг', className: 'category-education' },
    ],
  },
  {
    id: 5,
    name: 'Дом и уют',
    icon: '/icons/home.svg',
    className: 'category-home',
    subCategories: [
      { id: 501, name: 'Уборка и организация', className: 'category-home' },
      { id: 502, name: 'Домашние финансы', className: 'category-home' },
      { id: 503, name: 'Приготовление еды', className: 'category-home' },
      { id: 504, name: 'Домашние растения', className: 'category-home' },
      { id: 505, name: 'Ремонт', className: 'category-home' },
      { id: 506, name: 'Хранение вещей', className: 'category-home' },
    ],
  },
  {
    id: 6,
    name: 'Здоровье и лайфстайл',
    icon: '/icons/lifestyle.svg',
    className: 'category-health',
    subCategories: [
      { id: 601, name: 'Йога и медитация', className: 'category-health' },
      { id: 602, name: 'Питание и ЗОЖ', className: 'category-health' },
      { id: 603, name: 'Ментальное здоровье', className: 'category-health' },
      { id: 604, name: 'Осознанность', className: 'category-health' },
      { id: 605, name: 'Физические тренировки', className: 'category-health' },
      { id: 606, name: 'Сон и восстановление', className: 'category-health' },
      { id: 607, name: 'Баланс жизни и работы', className: 'category-health' },
    ],
  },
]
