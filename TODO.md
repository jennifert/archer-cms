# Archer CMS – Project TODOs

This file tracks future enhancements, improvements, and cleanup tasks.

---

## In Progress

### 🐛 Known Issues & Error Handling
- [ ] Add backend logs for successful/failed authentication events
- [ ] Improve frontend error messages for failed API requests

---

### 🔐 Authentication & Security
- [ ] Apply `requireRole('admin')` middleware to admin-only routes
- [ ] Restrict `endpoints.jsx` and the Endpoints menu item to admin users
- [ ] Enforce password strength validation
- [ ] Implement rate limiting with `express-rate-limit`
- [ ] Add email verification and password reset
- [ ] Review session cookie settings for production
- [ ] Review long-term SQLite driver strategy

---

### 🧠 Code Quality & Structure
- [ ] Review remaining legacy CSS/component class names
- [ ] Add shared frontend helpers for repeated API/error handling where useful

---

### 🧪 Testing
- [ ] Add unit tests with Vitest
- [ ] Add integration tests for authentication, routes, and database operations
- [ ] Add tests for admin permissions
- [ ] Add tests for duplicate email handling and password hashing
- [ ] Add `npm run seed:test` or preview-only seed mode for safe DB resets

---

### 🧰 External Tools & Editor
- [ ] Replace `<textarea>` in `dashboard_form.jsx` with a WYSIWYG editor
    - Options: TipTap, Quill, Editor.js, CKEditor 5

---

### 🧱 Frontend
- [ ] Improve screen-reader accessibility and keyboard navigation
- [ ] Add frontend input validation and clearer validation feedback
- [ ] Make dashboard form legend change between Create and Edit modes
- [ ] Review mobile layout after Pico CSS migration

---

### 📦 Deployment
- [ ] Decide on a deployment target
- [ ] Review production-ready Express/Vite configuration
- [ ] Document production environment variables
- [ ] Add deployment instructions
- [ ] Review secure cookie/session settings for HTTPS deployment

---

### 🗄️ Database & Setup
- [ ] Document safe database initialization for new installs
- [ ] Consider adding a non-destructive first-run setup command
- [ ] Review database migration strategy for future schema changes

---

## Completed

### 🧠 Code Quality & Structure
- [x] Migrate from Mongoose to Sequelize + SQLite
- [x] Refactor routes to use controller/services pattern
- [x] Add `.env.example` for safer onboarding
- [x] Add ESLint + `jsx-a11y` accessibility linting
- [x] Upgrade SQLite dependency
- [x] Verify page create/edit/delete operations after dependency upgrades

---

### 📝 Documentation
- [x] Add `README.md` sections for setup, seed, and usage
- [x] Create API reference documentation

---

### 🧰 External Tools & Editor
- [x] Remove Filestack integration from frontend

---

### 🧱 Frontend
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