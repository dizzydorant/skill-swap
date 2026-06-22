# SkillSwap — шаблон проекта

Платформа обмена навыками. Это **темплейт-репозиторий** — не форкай, а нажимай «Use this template».

---

## Быстрый старт

```bash
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173)

---

## State management

Проект использует **Redux Toolkit**. Store настроен в `src/store/index.ts`.

Для работы со store используй типизированные хуки из `src/store/hooks.ts` — `useAppDispatch` и `useAppSelector` вместо оригинальных из react-redux.

---

## Структура проекта

```
src/
├── api/                  # fetch-функции для загрузки JSON-моков
├── app/
│   ├── providers/        # StoreProvider, RouterProvider
│   └── styles/           # global.css с CSS-переменными
├── entities/             # Доменные модели: Skill, User, Request
│   ├── skill/
│   ├── user/
│   └── request/
├── features/             # Фичи: auth, skills, favorites, requests
├── pages/                # Страницы приложения
├── shared/
│   ├── hooks/            # useDebounce, useLocalStorage
│   ├── lib/              # constants, helpers
│   ├── types/            # общие TypeScript-типы
│   └── ui/               # атомарные компоненты
├── store/                # Redux store и типизированные хуки
└── widgets/              # Составные блоки: Header, SkillCard, FiltersBar

public/
└── db/
    ├── skills.json       # Добавь сюда моки навыков
    └── users.json        # Добавь сюда моки пользователей
```

---

## Моки данных

Файлы `public/db/skills.json` и `public/db/users.json` **пустые** — студенты заполняют сами.

Структура объектов описана в `src/shared/types/index.ts`.

---

## Доступные скрипты

| Скрипт | Что делает |
|--------|------------|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Сборка для продакшена |
| `npm run lint` | Проверка ESLint + Stylelint |
| `npm run lint:fix` | Автоисправление lint-ошибок |
| `npm run format` | Форматирование через Prettier |
| `npm run test` | Запуск тестов |
| `npm run test:watch` | Тесты в watch-режиме |
| `npm run test:coverage` | Покрытие (цель ≥ 70%) |

---

## Роутинг

Маршруты объявлены в `src/shared/lib/constants.ts` → `ROUTES`.

Lazy-загрузка уже настроена в `src/app/providers/RouterProvider.tsx`.

Для защищённых маршрутов добавь компонент `PrivateRoute` в `src/features/auth/ui/`.

---

## Переменные окружения

Создай `.env.local` для локальных настроек (в `.gitignore` уже исключён):

```
VITE_APP_TITLE=SkillSwap
```

Доступ в коде: `import.meta.env.VITE_APP_TITLE`

---

## Git-процесс

```
main        ← только стабильный код, не трогаем напрямую
└── develop ← основная ветка разработки, PR только сюда
    └── feature/catalog-filters   ← твоя задача
        └── → PR → code review → merge в develop
```

Перед началом каждой задачи:
```bash
git checkout develop
git pull
git checkout -b feature/название-задачи
```

После завершения:
```bash
git push -u origin feature/название-задачи
# открываешь PR из своей ветки → в develop
```

Ветки называй: `feature/`, `fix/`, `refactor/`, `docs/`, `chore/`

Коммиты по [Conventional Commits](https://www.conventionalcommits.org/ru/):
```
feat: добавить фильтр по категориям
fix: исправить отображение карточки на мобильном
refactor: вынести логику избранного в хук
```

PR — не больше ~200 строк изменений. Вливает только тимлид или его заместитель. `--force` и `merge --no-ff` в `develop` запрещены.

---

## CI

GitHub Actions запускается на каждый push и PR:
- `npm run lint`
- `tsc --noEmit`
- `npm run test`
- `npm run build`

Если CI красный — PR не мержится.

