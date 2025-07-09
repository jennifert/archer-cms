# Archer CMS – Project TODOs

This file tracks future enhancements, improvements, and cleanup tasks.

---
## In Progress
### 🐛 Known Issues & Error Handling
- [ ] Add backend logs for success/fail auth events (currently logs only show DB queries)

---

### 🔐 Authentication & Security
- [ ] Add `requireRole('admin')` middleware for secure routes (`require_login`, `server/middleware/requirerole.js`)
- [ ] Enforce password strength validation (min length, character mix)
- [ ] Implement rate limiting with `express-rate-limit`
- [ ] Add email verification and password reset (token-based)
- [ ] Move endpoints.jsx, and endpoint item in app.jsx, menu.jsx to be admin only.

---

### 🧠 Code Quality & Structure
- [ ] Add ESLint + `jsx-a11y` plugin for accessibility linting

---

### 🧪 Testing
- [ ] Add unit tests (Jest or Vitest)
- [ ] Add integration tests for auth, routes, and DB
- [ ] Add npm run seed:test or preview-only seed mode for safe DB state resets

---

### 🧰 External Tools & Editor
- [ ] Replace `<textarea>` in dashboard_form.jsx with a proper WYSIWYG editor
    - Options: TipTap, Quill, Editor.js, CKEditor 5 (open-source mode)

---

### 🧱 Frontend
- [ ] Audit layout spacing and grid alignment
- [ ] Refactor legacy inline styles into Tailwind classes
- [ ] Normalize button and form input styles with DaisyUI components
- [ ] Improve layout and a11y for screen readers (labels need htmlfor)
- [ ] Input testing validation

---

### 📦 Deployment
- [ ] Generate Dockerfile and `.dockerignore`
- [ ] Add production-ready build scripts
- [ ] Add deployment instructions (e.g. Render, Vercel, Railway)

---

## Completed


### 🧠 Code Quality & Structure
- [x] Migrate from Mongoose to Sequelize + SQLite
- [x] Refactor routes to use controller/services pattern
- [x] Add `.env.example` for safer onboarding

---

### 📝 Documentation
- [x] Add `README.md` sections for setup, seed, and usage (done for most)
- [x] Create API reference docs (Markdown, Swagger, or Postman)

---

### 🧰 External Tools & Editor
- [x] Remove Filestack integration from frontend (no longer needed) or NodeJS only

---

### 🧱 Frontend
- [x] Convert all JSX `.js` files to `.jsx` (done for most)
- [x] Update components to use `filename` instead of `headerUrl`
- [x] Fix Styling
- [x] Add image upload validation (1MB max, image/* only)
