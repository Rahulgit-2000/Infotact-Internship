# Collaborative AI Ideation Platform

A full-stack collaborative platform that enables users to generate AI-powered ideas, manage projects with Kanban task boards, collaborate in real-time using whiteboards and chat, and persist all work securely.

This project was developed as part of an internship to demonstrate real-world full-stack engineering, system design, authentication, persistence, and real-time collaboration.

---

## 🚀 Features

### 🔐 Authentication
- User registration and login (JWT-based)
- Secure API access using auth middleware
- User-specific data isolation

### 🤖 AI Idea Generator
- AI-powered idea generation (Gemini API)
- Category-based prompts
- Manual **Save Idea** option for logged-in users
- Persistent idea storage per user
- Project-linked ideas support

### 📁 Projects
- Create and manage multiple projects
- Each project acts as a collaboration workspace

### ✅ Kanban Task Board
- To Do / In Progress / Done columns
- Drag-and-drop task movement
- Persistent task state (MongoDB)
- Project-specific task isolation

### 🧠 Whiteboard (Real-Time)
- Real-time collaborative drawing
- Multi-user sync via Socket.IO
- Project-scoped rooms

### 💬 Real-Time Chat
- Live chat per project
- Logged-in user names displayed correctly
- Messages persisted in database
- JWT-authenticated socket connections

---

## 🏗️ Tech Stack

### Frontend
- React
- Material UI
- React Router
- Axios
- Socket.IO Client
- DnD Kit

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.IO
- Google Gemini API

---

## 📂 Project Structure

```
collaborative-ai-platform/
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket/
│   ├── middleware/
│   └── server.js
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### Backend
```
cd server
npm install
npm run dev
```

Create a `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_gemini_api_key
```

### Frontend
```
cd client
npm install
npm start
```

---

## 👨‍💻 Developer
**Rahul R**  
Internship Project – Infotact

---

## 📄 License
For educational and internship evaluation purposes only.
