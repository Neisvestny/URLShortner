# URL Shortener

Fullstack-приложение для сокращения ссылок с поддержкой авторизации и аналитики переходов.

---

## Возможности

* Аутентификация пользователей (JWT)
* Создание коротких ссылок
* Редиректы по короткому коду
* Просмотр статистики переходов
* Поиск и фильтрация ссылок
* Отображение аналитики

---

## Технологии

### Frontend

* React
* TypeScript
* Vite
* Redux Toolkit
* Axios

### Backend

* Node.js
* Express
* TypeScript
* PostgreSQL

### Инфраструктура

* Docker
* Docker Compose

---

## Структура проекта

```bash
.
├── backend
│   ├── src
│   │   ├── controllers     # обработчики запросов
│   │   ├── routes          # маршруты API
│   │   ├── middlewares     # middleware (логирование, ошибки)
│   │   ├── config          # конфигурация (env и т.д.)
│   │   ├── lib             # вспомогательные модули (логгер)
│   │   ├── utils           # утилиты
│   │   ├── app.ts          # конфигурация express
│   │   └── server.ts       # точка входа
│   ├── package.json
│   └── tsconfig.json
│
├── frontend
│   ├── src
│   │   ├── api             # работа с backend API
│   │   ├── components      # UI компоненты
│   │   ├── pages           # страницы
│   │   ├── hooks           # кастомные хуки
│   │   ├── features        # redux slices
│   │   ├── layouts         # layout-компоненты
│   │   ├── types           # типы
│   │   ├── utils           # утилиты
│   │   └── main.tsx        # точка входа
│   ├── package.json
│   └── vite.config.ts
│
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Database

В проекте используется **PostgreSQL**.

Структура базы данных описана в файле:

```
schema.sql
```

### Применение схемы

Перед запуском убедитесь, что база данных создана, затем выполните:

```bash
psql -h <host> -p <port> -U <user> -d <database> -f schema.sql
```

Пример:

```bash
psql -h localhost -p 5432 -U postgres -d urlshortner -f schema.sql
```

> Важно: схема использует расширение pgcrypto для генерации UUID.
> Оно будет создано автоматически при применении схемы.

### Структура базы данных

#### Основные таблицы
* `users` — пользователи
* `links` — сокращённые ссылки
* `visits` — информация о переходах

#### Связи
* `links.user_id` → `users.id`
* `visits.link_id` → `links.id`

---

## Установка и запуск

### 1. Клонирование

```bash
git clone https://github.com/Neisvestny/URLShortner
cd URLShortner
```

---

### 2. Настройка окружения

Создай файл `.env` на основе примера:

```bash
mv .env.example .env
```

После этого при необходимости отредактируй значения переменных.

---

### 3. Запуск через Docker

```bash
docker compose up --build
```

Приложение будет доступно по адресу:

```
http://localhost:3000
```

---

### 4. Локальный запуск

#### Backend

```bash
cd backend
npm install
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API

### Auth

Работа с аутентификацией пользователя.

* `POST /auth/login` — вход в систему
* `POST /auth/logout` — выход из системы
* `GET /auth/me` — получить текущего пользователя

---

### Links

Управление ссылками пользователя.

* `POST /links` — создать короткую ссылку
* `GET /links` — получить список ссылок
* `GET /links/:id` — получить информацию о ссылке (404, если не найдена)
* `GET /links/:id/stats` — получить статистику по ссылке

---

### Stats

Глобальная статистика сайта.

* `GET /stats` — получить общую статистику

---

### Public Links

Публичные маршруты (без авторизации).

* `GET /r/:slug` — редирект на оригинальный URL

---

## Docker

Сборка происходит в несколько этапов:

1. Сборка frontend (Vite)
2. Компиляция backend (TypeScript)
3. Production-образ с минимальными зависимостями

---

## Дальнейшее развитие

* Ограничение частоты запросов (rate limiting)
* Кастомные алиасы ссылок
* Улучшение UX
