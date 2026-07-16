export const ROUTES = {
  HOME: '/',
  SKILL: '/skill/:id',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CREATE: '/create',
  LOGIN: '/login',
  REGISTER: '/register',
} as const

export const SKILL_CATEGORIES = [
  'Программирование',
  'Дизайн',
  'Языки',
  'Музыка',
  'Спорт',
  'Кулинария',
  'Фото и видео',
  'Бизнес',
  'Другое',
] as const

export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  REGISTERED_USERS: 'skillswap_registered_users',
  CREATED_SKILL_SUCCESS: 'skillswap_created_skill_success',
  PROFILE_OVERRIDES: 'skillswap_profile_overrides',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  SEEN_NOTIFICATIONS: 'skillswap_seen_notifications',
  THEME: 'skillswap_theme',
} as const
