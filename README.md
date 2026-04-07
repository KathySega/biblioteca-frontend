# Biblioteca Frontend

Angular 17 frontend for the Biblioteca library management system. Communicates with the [biblioteca](https://github.com/KathySega/biblioteca) Spring Boot backend.

## Features

- User registration and JWT-based login
- Browse and search books
- View book details
- Borrow and return books (loans)
- Admin-only: create and edit books, create loans
- Route guards for authentication and admin role

## Tech Stack

- Angular 17 (standalone components, lazy loading)
- Bootstrap 5 + Bootstrap Icons
- RxJS

## Prerequisites

- Node.js 18+
- Angular CLI 17: `npm install -g @angular/cli`
- Backend running at `http://localhost:8081`

## Getting Started

```bash
npm install
npm start
```

Navigate to `http://localhost:4200/`. The app proxies `/api` requests to the backend at port 8081.

## Build

```bash
npm run build
```

Build artifacts are output to `dist/`.

## Running Tests

```bash
npm test
```

## Project Structure

```
src/app/
├── components/       # Shared components (navbar, confirm modal)
├── guards/           # Auth and admin route guards
├── interceptors/     # JWT auth interceptor
├── models/           # TypeScript interfaces
├── pages/            # Feature pages (login, registro, libros, prestamos)
└── services/         # HTTP services (auth, libro, prestamo, modal)
```

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login |
| `/registro` | Public | Register |
| `/libros` | Auth | Book list |
| `/libros/:id` | Auth | Book detail |
| `/libros/nuevo` | Admin | Create book |
| `/libros/:id/editar` | Admin | Edit book |
| `/prestamos` | Auth | Loan list |
| `/prestamos/nuevo` | Admin | Create loan |

## Backend

See [biblioteca](https://github.com/KathySega/biblioteca) for the Spring Boot REST API.
