# 📝 MERN Stack Planner (Plano)

A sleek, full-stack task management application built using the **MERN** stack (MongoDB, Express, React, Node.js) styled with **Tailwind CSS** and **DaisyUI**.

---

## Key Features

- **Tailwind CSS & DaisyUI Interface:** Built with clean, accessible components including DaisyUI themes, badges, cards, and navigation drawer layouts.
- **Secure Authentication:** JWT-driven auth flow using short-lived access tokens and secure HTTP-only refresh cookies.
- **Persistent Sessions:** Automatic session recovery on app launch via React Context (`AuthContext`).
- **Task Schema Validation:** Mongoose enum constraints ensuring validated task statuses and color badge categories.
- **Modular Express Architecture:** Decoupled server design utilizing mounted route handlers and dedicated models.

---

## 🛠️ Tech Stack

### **Frontend**

- **React** (Vite context/provider setup)
- **Tailwind CSS** + **DaisyUI**
- **Axios** (Configured with Interceptors for JWT authorization headers and token retry loops)
- **React Icons**

### **Backend**

- **Node.js** & **Express.js** (Modular route handlers)
- **MongoDB** & **Mongoose** (Validation schemas & timestamps)
- **JSON Web Tokens (JWT)** & **Cookie Parser**

---

## 📂 Project Structure

```text
mern-stack-planner/
├── client/                 # React + DaisyUI Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/        # AuthContext & State Management
│   │   └── main.jsx
│   │   └── AxiosInterceptor.jsx
│   │   └── App.jsx
│   └── package.json
│
└── server/                 # Express Backend
    ├── models/             # Task & User Mongoose Schemas
    ├── routes/             # Mounted Express Routers
    ├── server.js           # Server initialization
    └── package.json
```
