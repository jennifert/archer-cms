# Archer CMS – API Reference

A reference for the available API endpoints used in the Archer CMS backend.

---

## 🧑 Authentication

### `POST /api/login`
- **Purpose:** Logs in a user
- **Body:** `{ email, password }`
- **Returns:** `{ message, user }`

### `POST /api/signup`
- **Purpose:** Registers a new user and logs them in
- **Body:** `{ name, email, password }`

### `GET /api/me`
- **Purpose:** Returns the current logged-in user session
- **Returns:** `{ id, name, email, role }`

### `GET /api/logout`
- **Purpose:** Logs out the current user

---

## 🧱 Pages

### `GET /api/page`
- **Purpose:** Get all pages
- **Auth Required:** Yes

### `GET /api/page/:id`
- **Purpose:** Get a specific page by ID

### `POST /api/page`
- **Purpose:** Create a new page
- **Body:** `{ title, content, CategoryId, ContentTypeId }`

### `PUT /api/page/:id`
- **Purpose:** Update a page

### `DELETE /api/page/:id`
- **Purpose:** Delete a page

---

## 🏷️ Tags

### `GET /api/tags`
- **Purpose:** Get all tags

### `POST /api/tags`
- **Purpose:** Create a new tag

### `PUT /api/tags/:id`
- **Purpose:** Update a tag

### `DELETE /api/tags/:id`
- **Purpose:** Delete a tag

---

## 🧩 Categories

### `GET /api/categories`
- **Purpose:** Get all categories

### `POST /api/categories`
- **Purpose:** Create a new category

### `GET /api/categories/:id`
- **Purpose:** Get a specific category

### `PUT /api/categories/:id`
- **Purpose:** Update a category

### `DELETE /api/categories/:id`
- **Purpose:** Delete a category

---

## 🧠 Content Types

### `GET /api/types`
- **Purpose:** Get all content types

### `POST /api/type`
- **Purpose:** Create a new content type
- **Body:** `{ name }`

### `GET /api/type/:id`
- **Purpose:** Get content type by ID

### `PUT /api/type/:id`
- **Purpose:** Update content type

### `DELETE /api/type/:id`
- **Purpose:** Delete content type

---

## 🖼️ Header Images

### `GET /api/images/headers`
- **Purpose:** List all header images

### `POST /api/images/header/upload`
- **Purpose:** Upload a new image
- **FormData:** `image` (file)

### `DELETE /api/images/header/:id`
- **Purpose:** Delete a specific image by ID

---

## 🛠 Developer

### `GET /api/settings/endpoints`
- **Purpose:** List all known API routes and metadata (for dev/testing)