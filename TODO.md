# Archer CMS – Project TODOs

This file tracks future enhancements, improvements, and cleanup tasks by planned release.

---

## v2.1.0 — Authentication, Security & Error Handling

Focus: strengthen authentication behavior, enforce roles properly, and improve failure feedback.

### 🐛 Error Handling
- [ ] Add backend logs for successful/failed authentication events
- [ ] Improve frontend error messages for failed API requests

### 🔐 Authentication & Security
- [x] Apply `requireRole('admin')` middleware to admin-only routes
- [x] Restrict `endpoints.jsx` and the Endpoints menu item to admin users
- [ ] Enforce password strength validation
- [ ] Implement rate limiting with `express-rate-limit`
- [ ] Add admin-controlled password reset for local users
- [ ] Review session cookie settings for production

---

## v2.2.0 — Code Quality & Database Setup

Focus: reduce repeated frontend code and improve database/setup maintainability.

### 🧠 Code Quality & Structure
- [ ] Add shared frontend helpers for repeated API/error handling where useful
- [ ] Create reusable form components for common CRUD operations
    - Categories, Tags, and Content Types currently use similar add/edit forms
    - Share common form layout, validation, error messages, Save/Cancel actions, and API handling where practical
- [ ] Document a manual release smoke-test checklist
- [ ] Add HTML/JSX markup validation
    - Review `html-validate` with React/JSX support
    - Add an npm validation script if appropriate

### 🗄️ Database & Setup
- [ ] Document safe database initialization for new installs
- [ ] Consider adding a non-destructive first-run setup command
- [ ] Review database migration strategy for future schema changes
- [ ] Review long-term SQLite driver strategy

---

## v2.3.0 — Frontend & Accessibility

Focus: improve frontend usability, validation, accessibility, and responsive behavior.

### 🧱 Frontend
- [ ] Improve screen-reader accessibility and keyboard navigation
- [ ] Add frontend input validation and clearer validation feedback
- [ ] Make dashboard form legend change between Create and Edit modes
- [ ] Review mobile layout after Pico CSS migration

---

## v2.4.0 — Rich Text Editing

Focus: improve the page/post editing experience.

### 🧰 External Tools & Editor
- [ ] Replace `<textarea>` in `dashboard_form.jsx` with a WYSIWYG editor
    - Options: TipTap, Quill, Editor.js, CKEditor 5

---

## v2.5.0 — Dependency Maintenance

Focus: review major dependency upgrades individually and preserve the current stable behavior.

### 📦 Dependencies & Maintenance
- [ ] Review and test dependency updates individually
- [ ] Review `dotenv` 16 → 17
- [ ] Review `bcrypt` 5 → 6
- [ ] Review `concurrently` 9 → 10
- [ ] Plan ESLint 9 → 10 migration
    - Upgrade `eslint` and `@eslint/js` together
    - Verify React and `jsx-a11y` plugin compatibility
- [ ] Plan Vite 6 → 8 migration
    - Review `@vitejs/plugin-react` compatibility at the same time
- [ ] Review `express-rate-limit` version and compatibility
- [ ] Plan Express 4 → 5 migration separately
    - Review `express-rate-limit` compatibility at the same time

---

## v2.6.0 — Production & Deployment

Focus: prepare Archer for a production-style deployment configuration and document the process.

### 📦 Deployment
- [ ] Review production-ready Express/Vite configuration
- [ ] Document production environment variables
- [ ] Add deployment instructions
- [ ] Review secure cookie/session settings for HTTPS deployment

---

## Completed

### v2.0.0

#### 🧠 Code Quality & Structure
- [x] Migrate from Mongoose to Sequelize + SQLite
- [x] Refactor routes to use controller/services pattern
- [x] Add `.env.example` for safer onboarding
- [x] Add ESLint + `jsx-a11y` accessibility linting
- [x] Upgrade SQLite dependency
- [x] Verify page create/edit/delete operations after dependency upgrades
- [x] Remove remaining legacy CSS/component class names after Pico migration

#### 📝 Documentation
- [x] Add `README.md` sections for setup, seed, and usage
- [x] Create API reference documentation

#### 🧰 External Tools & Editor
- [x] Remove Filestack integration from frontend

#### 🧱 Frontend
- [x] Convert JSX `.js` files to `.jsx`
- [x] Update components to use `filename` instead of `headerUrl`
- [x] Replace Tailwind CSS and DaisyUI with Pico CSS
- [x] Remove legacy Tailwind/DaisyUI styling classes
- [x] Remove unused PostCSS configuration/dependency
- [x] Normalize form and button styling with Pico CSS
- [x] Add reusable action-button spacing
- [x] Add success/error alert styling
- [x] Fix form label `htmlFor` associations
- [x] Add image upload validation (1 MB max, `image/*` only)
- [x] Audit layout spacing and grid alignment