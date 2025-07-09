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
- SQLite via Sequelize (replaces MongoDB)
- React + Vite (replaces Gulp & Browserify)
- Passport local auth with bcrypt
- Role-based architecture (admin/author/viewer)
- Image upload seeding (with `.gitkeep` protection)
- Accessible and testable frontend
- Modern ESLint config for React projects

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Backend:** Express.js, Passport (local strategy)
- **Database:** SQLite (via Sequelize ORM)
- **Authentication:** bcrypt + Passport.js
- **File Uploads:** Multer (local, seed images supported)

---

## 📦 Prerequisites
Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [npm](https://www.npmjs.com/) (version 10 or higher)
- Git CLI for cloning
- SQLite (auto-created via Sequelize — no setup needed)

Optionally:
- [VS Code](https://code.visualstudio.com/) + ESLint/Tailwind extensions

---

## 🧭 Project Structure (WIP)
- /client -> React + Vite frontend
- /server -> Express routes and auth
- /public/images -> Uploaded content (not tracked by git)
- /seed_assets -> Images for database seeding
- .env -> Environment config

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
   Create a `.env` file in the project root with the following:
   
   ```env
   NODE_ENV=development          # Can be 'development' or 'production'
   PORT=5000                     # Server port
   COOKIE_SECRET=changeme123     # Used to sign session cookies
   COOKIE_SECURE=false           # Set to true in production with HTTPS
   COOKIE_SAMESITE=lax           # Recommended: 'lax' or 'strict'
   ```
   
   > 💡 For production, make sure to change `COOKIE_SECRET` to something long and secure.
   
   📄 See [env.example](./env.example) for the latest template.

4. **Add a Sample Image**
    Place a test image in:
    ```
    /seed_assets/sample1.jpg
    ```

5. **Seed the Database**
    Safe prompt:
    ```bash
    npm run seed:safe
    ```

    Or force seed:
    ```bash
    npm run seed
    ```

6. **Start Development Server**
    ```bash
    npm run dev
    ```

---

## 📜 NPM Scripts

| Command             | Description                                 |
|---------------------|---------------------------------------------|
| `npm run dev`       | Starts Vite (frontend) and Nodemon (server) |
| `npm run seed`      | Force seeds the database                    |
| `npm run seed:safe` | Safe seeding with confirmation prompt       |
| `npm run build`     | Builds frontend and runs postbuild scripts  |
| `npm run serve`     | Serves the production frontend build        |

---

## ✅ Notes

- The database (`db.sqlite`) and uploaded images (`public/images/`) are auto-generated during seeding.
- `.gitkeep` is used to track empty folders for uploads.
- Modify `import.js` to customize your seed content.

### ✍️ Rich Text Editor
Editor: TBD 

This CMS supports WYSIWYG editing via [Example](https://example.org).  
To customize behavior or sanitize output, see `/src/components/______.jsx`.

---

## 📘 Documentation

- [`TODO.md`](./TODO.md) — Roadmap and planned enhancements
- [`API_REFERENCE.md`](./API_REFERENCE.md) — Full list of backend API routes
- `/api/settings/endpoints` — Dev-only route that returns all current Express routes dynamically

---

## 🚢 Deployment (Coming Soon)

TBD

---

## 📌 TODO Highlights

See [TODO.md](TODO.md) for full roadmap.

- Add role-based route protection (`requireRole('admin')`)
- Password strength validation
- Integration testing (Jest/Vitest)
- Production build + deploy (Render, Docker, etc.)

---

## :gem: Acknowledgments

This project would not be possible without these fantastic community resources:

- [Shields.io](https://shields.io/) — For README badges
- [Awesome README](https://github.com/matiassingers/awesome-readme) — For formatting inspiration