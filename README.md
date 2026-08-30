# Archer CMS

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![SQLite](https://img.shields.io/badge/database-SQLite-lightgrey)
![React](https://img.shields.io/badge/frontend-React%2019-blue)
![Build with Vite](https://img.shields.io/badge/bundler-Vite-646CFF)
[![Node.js](https://img.shields.io/badge/Node.js-22.16.0-brightgreen?logo=nodedotjs)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-10.9.2-red?logo=npm)](https://www.npmjs.com/)

A modernized full-stack content management system built with React (Vite), Express, SQLite (via Sequelize), and Passport for authentication.

---

## 📄 License

This project is licensed under the **MIT License**.

You are free to:
- ✅ Use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software  
- ✅ Use the project for personal, educational, internal, or commercial purposes  
- ✅ Credit is appreciated but **not legally required**  
- ❌ The software is provided **"as is"**, without warranty of any kind

For details, see the [LICENSE](./LICENSE) file.

---

## 🚀 Features

- SQLite database via Sequelize
- React 19 frontend powered by Vite
- Express.js backend
- Passport local authentication with bcrypt password hashing
- Role-based architecture (admin/author/viewer)
- Local image uploads with Multer
- Database seeding for development and initial setup
- Accessible frontend with ESLint and `jsx-a11y`
- Lightweight responsive styling with Pico CSS

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Pico CSS
- **Backend:** Express.js, Passport (local strategy)
- **Database:** SQLite via Sequelize ORM
- **Authentication:** bcrypt + Passport.js
- **File Uploads:** Multer (local storage)
- **Linting:** ESLint + `eslint-plugin-react` + `eslint-plugin-jsx-a11y`

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) (version 10 or higher)
- Git CLI for cloning

SQLite does not require separate setup. The database is created and managed locally through Sequelize.

Optionally:

- [VSCodium](https://vscodium.com/) or [Visual Studio Code](https://code.visualstudio.com/)
- ESLint editor extension

---

## 🧭 Project Structure

- `/src` — React frontend components and styles
- `/server` — Express controllers, routes, middleware, and database models
- `/public` — Static frontend assets
- `/public/images` — Locally uploaded images
- `/seed_assets` — Assets used by the database seeder
- `/scripts` — Build and utility scripts
- `app.js` — Express application entry point
- `import.js` — Database seeding script
- `vite.config.js` — Vite configuration and development API proxy
- `.env` — Local environment configuration (not committed)
- `.env.example` — Example environment configuration

---

## ⚙️ Getting Started

1. **Clone the Repository**
    ```bash
    git clone https://github.com/jennifert/archer-cms.git
    cd archer-cms
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   The development configuration should look similar to:

   ```env
   NODE_ENV=development
   PORT=5001
   COOKIE_SECRET=changeme123
   COOKIE_SECURE=false
   COOKIE_SAMESITE=lax
   ```

   > For production, replace `COOKIE_SECRET` with a long, secure value and enable secure cookies when using HTTPS.

   See [`.env.example`](./.env.example) for the latest template.

4. **Add a Sample Image**

   Place a test image at:

   ```text
   seed_assets/sample1.jpg
   ```

5. **Seed the Database**

   For the interactive safe seed:

   ```bash
   npm run seed:safe
   ```

   To force a database reset and seed:

   ```bash
   npm run seed
   ```

   > ⚠️ `npm run seed` is destructive and may overwrite existing database content.

6. **Start the Development Environment**

   ```bash
   npm run dev
   ```

   This starts both:

   - the Vite frontend development server
   - the Express backend with Nodemon

   Vite proxies `/api` requests to the Express server using the configured backend port.

---

## 📜 NPM Scripts

| Command               | Description                                      |
|-----------------------|--------------------------------------------------|
| `npm run dev`         | Starts Vite and the Express server together      |
| `npm run dev:client`  | Starts only the Vite development server          |
| `npm run dev:server`  | Starts only the Express server with Nodemon      |
| `npm start`           | Starts the Express server without Nodemon        |
| `npm run seed`        | Force seeds and resets the database              |
| `npm run seed:safe`   | Runs the database seeder with confirmation       |
| `npm run lint`        | Runs ESLint                                      |
| `npm run build`       | Builds the frontend and runs postbuild scripts   |
| `npm run serve`       | Previews the production frontend build with Vite |

---

## ✅ Notes

- The SQLite database (`db.sqlite`) is created locally and is not intended to be committed.
- Uploaded images are stored in `public/images/`.
- `.gitkeep` is used to preserve empty directories where needed.
- `import.js` contains the development seed data.
- `npm run seed` performs a forced database seed and may overwrite existing development data. Use it with care.
- Pico CSS provides the base frontend styling, with additional project-specific styles where needed.

### ✍️ Rich Text Editor

A rich text editor is planned but has not yet been implemented.

The dashboard currently uses a standard `<textarea>` for content editing. See `TODO.md` for the planned WYSIWYG editor work.

---

## 📘 Documentation

- [`TODO.md`](./TODO.md) — Roadmap and planned enhancements
- [`API_REFERENCE.md`](./API_REFERENCE.md) — Backend API route reference
- `/api/settings/endpoints` — Development endpoint that returns the currently registered Express routes

---

## 🚢 Deployment

Production deployment documentation is planned. See `TODO.md` for deployment-related work.

---

## 📌 TODO Highlights

See [`TODO.md`](./TODO.md) for the full roadmap.

- Apply role-based route protection with `requireRole('admin')`
- Improve password validation and authentication security
- Add unit and integration testing
- Add a rich text editor
- Establish a production deployment process

---

## 💎 Acknowledgments

This project would not be possible without these fantastic community resources:

- [Shields.io](https://shields.io/) — README badges
- [Awesome README](https://github.com/matiassingers/awesome-readme) — README formatting inspiration