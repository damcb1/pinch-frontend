# Pinch — Frontend

Mobile-first web client for **Pinch**, an app to save, organize and search recipes from different sources. Users can import a recipe from a link or pasted text, add recipes manually, upload a photo, filter their collection, and manage their account.

## Tech stack

- **React 19** + **Vite 8**
- **React Router 7** for routing
- **Axios** for the HTTP client (with a JWT interceptor)
- **SASS** (`sass-embedded`) with **BEM** naming, themed via CSS variables (light/dark)
- **Vitest** + **React Testing Library** for tests
- **ESLint** for linting
- **lucide-react** for icons

## Requirements

- Node.js 20+ (recommended LTS)
- The **Pinch backend** running (defaults to `http://localhost:8080`)

## Getting started

```bash
npm install
npm run dev
```

The app runs on Vite's dev server (default `http://localhost:5173`).

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run the tests in watch mode (Vitest) |
| `npm run test:run` | Run the tests once (CI mode) |

## Configuration

The API base URL is set in `src/services/api.js` (`http://localhost:8080/api`). The Axios instance automatically attaches the JWT (`Authorization: Bearer <token>`) from `localStorage` on every request, and redirects to the landing page on a `401`. Make sure the backend is running before starting the app.

## Features

- **Auth**: register, login, logout and delete account (JWT-based, stored in `localStorage`).
- **Recipes**: create manually, import from a URL or pasted text, view detail, edit and delete.
- **Image upload**: upload a photo per recipe; imported recipes keep their original image.
- **Search & filters**: by text, cuisine, time and origin.
- **Dark mode**: toggle themed with CSS variables (`data-theme`).
- **Accessibility & responsive**: semantic HTML, keyboard-friendly, mobile-first layout.

## Project structure

```
src
├── components
│   ├── common     # Button, Input, Modal, ImageUpload, Avatar, ChipGroup, ThemeToggle
│   ├── landing    # Landing page sections
│   ├── layout     # App and auth layouts
│   └── recipe     # RecipeForm, RecipeCard, IngredientRow, StepRow, IngredientCheck
├── pages          # One folder per route (Landing, Login, Register, MyRecipes, ...)
├── context        # AuthContext (and theme)
├── routes         # AppRouter and PrivateRoute
├── services       # api.js + one service per resource
├── constants      # Shared options (cuisines, difficulties, ...)
├── styles         # SASS variables, mixins and global styles
└── test           # Vitest setup
```