# Portail Web de Gestion de Restaurants

A full-stack restaurant management portal with two roles:

- **Super Admin** — manages all restaurants, their menus, and the platform's users.
- **Restaurant Admin** — manages a single restaurant (menu, categories, dishes, profile).

## Tech Stack

| Layer     | Technology                                    |
| --------- | --------------------------------------------- |
| Backend   | Laravel 12 (PHP 8.3+), JWT auth (`tymon/jwt-auth`) |
| Frontend  | React 19, Vite 8, Redux Toolkit, React Router |
| Database  | MySQL (default), SQLite supported             |

## Project Structure

```
.
├── backend/            # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/   # API controllers (Auth, Restaurant, Dish, ...)
│   │   ├── Http/Middleware/        # RoleMiddleware (role:super_admin,restaurant_admin)
│   │   └── Models/                 # Eloquent models
│   ├── database/
│   │   ├── migrations/             # Schema migrations
│   │   └── seeders/                # Demo data (SuperAdminSeeder, TestDataSeeder)
│   └── routes/api.php              # API route definitions
└── frontend/           # React SPA
    ├── src/
    │   ├── components/             # Reusable UI components (ui/, common/)
    │   ├── features/               # Feature pages (auth, dashboard/*)
    │   ├── layouts/                # Auth & dashboard layouts
    │   ├── services/api.js         # Axios instance with JWT + refresh handling
    │   └── store/                  # Redux Toolkit slices
    └── public/netlify.toml         # SPA redirects for static hosting
```

## Prerequisites

- PHP >= 8.3 with `pdo_mysql` (or `pdo_sqlite`)
- Composer
- Node.js >= 20
- MySQL (or use SQLite for a zero-config setup)

## Setup

### 1. Backend

```bash
cd backend
composer install

cp .env.example .env        # if .env doesn't exist yet
php artisan key:generate

# Configure the database in .env, e.g. MySQL:
#   DB_CONNECTION=mysql
#   DB_DATABASE=restaurant_portal
#   DB_USERNAME=root
#   DB_PASSWORD=

php artisan migrate
php artisan db:seed          # creates the Super Admin + demo restaurants/menus

php artisan serve            # serves the API on http://localhost:8000
```

> JWT is already configured (`tymon/jwt-auth`). If you change `JWT_SECRET` in `.env`,
> run `php artisan jwt:secret` to regenerate it.

### 2. Frontend

```bash
cd frontend
npm install

cp .env.example .env         # sets VITE_API_URL=http://localhost:8000/api

npm run dev                  # serves the SPA on http://localhost:5173
```

## Default Accounts

Seeded by `php artisan db:seed` (and the optional `TestDataSeeder`):

| Role             | Email                   | Password      |
| ---------------- | ----------------------- | ------------- |
| Super Admin      | `admin@restaurant.com`  | `password123` |
| Restaurant Admin | `admin1@example.com`    | `password123` |
| Restaurant Admin | `admin2@example.com`    | `password123` |
| Restaurant Admin | `admin3@example.com`    | `password123` |

> `TestDataSeeder` also creates demo restaurants, categories and dishes.
> Run it with `php artisan db:seed --class=TestDataSeeder`.

## Available Scripts

### Backend (`backend/`)

```bash
php artisan serve            # Start the API server
php artisan migrate          # Run migrations
php artisan db:seed          # Seed default data
php artisan test             # Run the test suite
composer lint                # Format-check with Laravel Pint
```

### Frontend (`frontend/`)

```bash
npm run dev                  # Start the Vite dev server
npm run build                # Production build to dist/
npm run preview              # Preview the production build
npm run lint                 # ESLint
```

## API Overview

All endpoints are prefixed with `/api` and (except auth) require a `Authorization: Bearer <token>` header.

| Method   | Endpoint                              | Access               |
| -------- | ------------------------------------- | -------------------- |
| POST     | `/api/auth/login`                     | Public               |
| POST     | `/api/auth/register`                  | Public               |
| POST     | `/api/auth/forgot-password`           | Public               |
| POST     | `/api/auth/reset-password`            | Public               |
| POST     | `/api/auth/logout`                    | Authenticated        |
| POST     | `/api/auth/refresh`                   | Authenticated        |
| GET      | `/api/auth/me`                        | Authenticated        |
| GET/PUT  | `/api/profile`                        | Authenticated        |
| PUT      | `/api/profile/password`               | Authenticated        |
| GET      | `/api/dashboard/super`                | Super Admin          |
| GET      | `/api/dashboard/restaurant`           | Super Admin, Restaurant Admin |
| CRUD     | `/api/restaurants`                    | Super Admin (write), Restaurant Admin (own) |
| CRUD     | `/api/users`                          | Super Admin          |
| CRUD     | `/api/categories`                     | Super Admin, Restaurant Admin |
| CRUD     | `/api/dishes`                         | Super Admin, Restaurant Admin |
| CRUD     | `/api/notifications`                  | Authenticated        |

> Role middleware: `role:super_admin` or `role:super_admin,restaurant_admin` per route in `routes/api.php`.

## Environment Variables

### Backend (`.env`)

- `APP_URL`, `FRONTEND_URL` — app origins used for links/CORS hints
- `DB_CONNECTION`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` — database connection
- `JWT_SECRET`, `JWT_TTL` — JWT signing secret and token lifetime (minutes)

### Frontend (`.env`)

- `VITE_API_URL` — base URL of the API, e.g. `http://localhost:8000/api`

## Deployment

The project is pre-configured for free hosting:

- **API (Laravel)** → [Railway](https://railway.app), via Docker
- **Frontend (React SPA)** → [Vercel](https://vercel.com) free tier
- **Database (MySQL)** → any free MySQL host (Clever Cloud, Aiven, Railway, …)

### 1. Deploy the API to Railway

The backend ships with a `Dockerfile` (nginx + PHP-FPM + supervisor), a
`railway.json` and an entrypoint that listens on `$PORT`, runs migrations and
creates the storage symlink automatically.

1. Push the repo to GitHub.
2. In Railway: **New Project → Deploy from GitHub repo** and pick the repo.
3. Create a service from the repo, then set its **Root Directory** to `backend`
   (Railway finds `railway.json` + `Dockerfile` there).
4. Add these variables in **Service → Variables**:
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_URL` → your Railway URL (set it after you generate a domain)
   - `FRONTEND_URL` → your Vercel frontend URL, e.g. `https://my-app.vercel.app`
   - `APP_KEY` → generate with `php artisan key:generate`
   - `JWT_SECRET` → generate with `php artisan jwt:secret`
   - `DB_CONNECTION=mysql`
   - `DB_HOST` / `DB_PORT` / `DB_DATABASE` / `DB_USERNAME` / `DB_PASSWORD` → your MySQL host
5. In **Settings → Networking**, click **Generate Domain** to get
   `https://your-app.up.railway.app`.

> Railway detects the Dockerfile and runs it with `backend/` as the build
> context. The health check (`/up`) is defined in `railway.json`.

**Environment variables** (see `backend/.env.production.example`):

| Variable | Purpose |
| -------- | ------- |
| `APP_URL` | Your Railway URL (used to build storage URLs) |
| `FRONTEND_URL` | Vercel frontend origin (used by CORS) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated extra allowed origins (optional) |
| `APP_KEY`, `JWT_SECRET` | App + JWT signing secrets |
| `DB_*` | MySQL connection details |
| `FILESYSTEM_DISK` | `local` (default) or `s3` for persistent uploads |

> **Note on uploads:** with `FILESYSTEM_DISK=local`, uploaded images live on the
> container disk and are lost on every redeploy. For persistent storage set
> `FILESYSTEM_DISK=s3` and provide `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
> `AWS_DEFAULT_REGION`, `AWS_BUCKET` (any S3-compatible provider works).

### 2. Deploy the frontend to Vercel

1. Push the repo to GitHub.
2. In Vercel: **New Project** → import the repo → **Root Directory**: `frontend`.
3. Vercel auto-detects Vite. Add one environment variable:
   - `VITE_API_URL` → `https://your-app.up.railway.app/api`
4. Deploy. `vercel.json` already rewrites all routes to `index.html` for SPA
   routing.

> `VITE_API_URL` is baked in at build time, so set it in **Project → Settings →
> Environment Variables** before each production build (or in the build command).

### 3. Seed the database (once)

Railway runs `php artisan migrate` automatically, but seeding is manual. From a
local machine with the `.env` pointed at your production MySQL:

```bash
cd backend
php artisan db:seed        # creates the Super Admin
php artisan db:seed --class=TestDataSeeder   # optional demo data
```

Then change the default Super Admin password from the UI (Settings).

## Notes

- The "Orders" module is a placeholder and returns a "coming soon" page.
- The frontend includes a `public/netlify.toml` and a `vercel.json` for SPA
  routing on Netlify / Vercel.
