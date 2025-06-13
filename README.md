# Archer CMS

A modernized full-stack content management system with React (Vite), Express, SQLite (via Sequelize), and Passport for authentication.

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

---

## 📦 Requirements
- Node.js 18+ recommended
- SQLite (auto-created)
- Git

---

## ⚙️ Setup Instructions

1. Clone/download this repo
2. Run `npm install`
3. Create a `.env` file (see example below)
4. Add a sample image to `/seed_assets/sample1.jpg`
5. Run the safe seed (with confirmation prompt):
    ```bash
    npm run seed:safe
    ```

   Or to forcefully reseed without prompt:
    ```bash
    npm run seed
    ```

6. Start the development server:
    ```bash
    npm run dev
    ```

---

## 🌱 .env Example

```
NODE_ENV=development
COOKIE_SECRET=changeme123
PORT=5000
```

---

## ✅ Notes

- The database (`db.sqlite`) and image uploads (`public/images/`) are automatically created during seeding.
- Uploaded files are not committed. Use `.gitkeep` to track empty folders.
- You can update the seeding script (`import.js`) to add more starter content.

---

## 📌 TODO Highlights

See [TODO.md](TODO.md) for full roadmap.

- Add role-based route protection (`requireRole('admin')`)
- Password strength validation
- Integration testing (Jest/Vitest)
- Production build + deploy (Render, Docker, etc.)
