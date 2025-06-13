# Archer CMS – Project TODOs

This file tracks future enhancements, improvements, and cleanup tasks.

---

## 🐛 Known Issues & Error Handling
- [ ] Add backend logs for success/fail auth events (currently logs only show DB queries)
- [ ] Move endpoints.jsx, and endpoint item in app.jsx, menu.jsx to be admin only.

---

## 🔐 Authentication & Security
- [ ] Add `requireRole('admin')` middleware for secure routes (`require_login`, `server/middleware/requirerole.js`)
- [ ] Enforce password strength validation (min length, character mix)
- [ ] Implement rate limiting with `express-rate-limit`
- [ ] Add email verification and password reset (token-based)

---

## 🧠 Code Quality & Structure
- [x] Migrate from Mongoose to Sequelize + SQLite
- [ ] Refactor routes to use controller/services pattern
- [ ] Add `.env.example` for safer onboarding
- [ ] Add ESLint + `jsx-a11y` plugin for accessibility linting
- [ ] Enable Prettier or standard formatting for all JS/JSX

---

## 🧪 Testing
- [ ] Add unit tests (Jest or Vitest)
- [ ] Add integration tests for auth, routes, and DB
- [ ] Add automated seed data test/preview mode

---

## 🧰 External Tools & Editor
- [x] Remove Filestack integration from frontend (no longer needed) or NodeJS only
- [ ] Replace `<textarea>` in dashboard_form.jsx with a proper WYSIWYG editor
    - Options: TipTap, Quill, Editor.js, CKEditor 5 (open-source mode)

---

## 🧱 Frontend
- [x] Convert all JSX `.js` files to `.jsx` (done for most)
- [x] Update components to use `filename` instead of `headerUrl`
- [ ] Add image upload validation (1MB max, image/* only)
- [ ] Improve layout and a11y for screen readers
- [ ] Input testing validation

---

## 📦 Deployment
- [ ] Generate Dockerfile and `.dockerignore`
- [ ] Add production-ready build scripts
- [ ] Add deployment instructions (e.g. Render, Vercel, Railway)

---

## 📝 Documentation
- [ ] Add `README.md` sections for setup, seed, and usage (done for most)
- [ ] Create API reference docs (Markdown, Swagger, or Postman)

---
