# 📄 Ajani-Article Upload App

A React component that allows administration of Ajani Center to upload documents (with metadata like title, content summary, and author), view them in a paginated card layout, edit or delete articles, and receive toast notifications for key actions.

---

## 🚀 Features

- 📂 Upload documents (.txt, .pdf, .docx, .jpg, .jpeg, .png)
- 📝 Add title, summary, and author metadata
- 🗂 View uploaded articles in a card layout
- ✏️ Edit articles (with cancel option)
- 🗑 Delete articles
- 🔔 Toast notifications (success/error)
- 📃 Pagination (5 articles per page)

---

## 🛠 Tech Stack

- **Frontend**: React, CSS
- **Backend API**: [Ajani Backend (Render)](https://ajani-backend-5oot.onrender.com)
- **Notifications**: toast

---

## 📦 Installation

```bash
git clone https://github.com/Njijinoela/Ajani-Admin.git
cd AjaniArticles
npm install
```

---

## ▶️ Usage

Start the development server:

```bash
npm run dev
```

The app will be available at `https://ajani-admin.vercel.app/`.

---

## 🧩 Component Overview

### `Articles.jsx`

- Handles form state and validation
- Supports editing articles with pre-filled fields
- Uploads files via FormData to backend API
- Displays articles in a paginated layout

---

## 📁 Folder Structure

```
src/
├── App.jsx
│── Articles.jsx
├── Footer.jsx
├── Nav.jsx
├── index.css
├── Footer.css
├── Navigation.css
└── main.jsx
```

---

## 🧪 API Endpoints

- **GET** `/articles` - Fetch all articles
- **POST** `/articles` - Upload article with file
- **PUT** `/articles/:id` - Update article
- **DELETE** `/articles/:id` - Delete article

---

## 📜 License

MIT License
