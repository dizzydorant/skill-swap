export type SkillCategoryIconKey =
  | 'briefcase'
  | 'palette'
  | 'global'
  | 'book'
  | 'home'
  | 'lifestyle'

export interface SkillSubcategory {
  id: number
  name: string
}

export interface SkillCategory {
  id: number
  name: string
  iconKey: SkillCategoryIconKey
  subCategories: SkillSubcategory[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 1,
    name: 'Бизнес и карьера',
    iconKey: 'briefcase',
    subCategories: [
      { id: 101, name: 'Управление командой' },
      { id: 102, name: 'Маркетинг и реклама' },
      { id: 103, name: 'Продажи и переговоры' },
      { id: 104, name: 'Личный бренд' },
      { id: 105, name: 'Резюме и собеседование' },
      { id: 106, name: 'Тайм-менеджмент' },
      { id: 107, name: 'Проектное управление' },
      { id: 108, name: 'Предпринимательство' },
    ],
  },
  {
    id: 2,
    name: 'Творчество и искусство',
    iconKey: 'palette',
    subCategories: [
      { id: 201, name: 'Рисование и иллюстрация' },
      { id: 202, name: 'Фотография' },
      { id: 203, name: 'Видеомонтаж' },
      { id: 204, name: 'Музыка и звук' },
      { id: 205, name: 'Актёрское мастерство' },
      { id: 206, name: 'Креативное письмо' },
      { id: 207, name: 'Арт-терапия' },
      { id: 208, name: 'Декор и DIY' },
    ],
  },
  {
    id: 3,
    name: 'Иностранные языки',
    iconKey: 'global',
    subCategories: [
      { id: 301, name: 'Английский' },
      { id: 302, name: 'Французский' },
      { id: 303, name: 'Испанский' },
      { id: 304, name: 'Немецкий' },
      { id: 305, name: 'Китайский' },
      { id: 306, name: 'Японский' },
      { id: 307, name: 'Подготовка к экзаменам (IELTS, TOEFL)' },
    ],
  },
  {
    id: 4,
    name: 'Образование и развитие',
    iconKey: 'book',
    subCategories: [
      { id: 401, name: 'Личностное развитие' },
      { id: 402, name: 'Навыки обучения' },
      { id: 403, name: 'Когнитивные техники' },
      { id: 404, name: 'Скорочтение' },
      { id: 405, name: 'Навыки преподавания' },
      { id: 406, name: 'Коучинг' },
    ],
  },
  {
    id: 5,
    name: 'Дом и уют',
    iconKey: 'home',
    subCategories: [
      { id: 501, name: 'Уборка и организация' },
      { id: 502, name: 'Домашние финансы' },
      { id: 503, name: 'Приготовление еды' },
      { id: 504, name: 'Домашние растения' },
      { id: 505, name: 'Ремонт' },
      { id: 506, name: 'Хранение вещей' },
    ],
  },
  {
    id: 6,
    name: 'Здоровье и лайфстайл',
    iconKey: 'lifestyle',
    subCategories: [
      { id: 601, name: 'Йога и медитация' },
      { id: 602, name: 'Питание и ЗОЖ' },
      { id: 603, name: 'Ментальное здоровье' },
      { id: 604, name: 'Осознанность' },
      { id: 605, name: 'Физические тренировки' },
      { id: 606, name: 'Сон и восстановление' },
      { id: 607, name: 'Баланс жизни и работы' },
    ],
  },
]
