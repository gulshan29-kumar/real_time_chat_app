# ⚡ QuickChat - Full-Stack Real-Time Messaging Platform

> A modern, high-performance real-time chat application built by **Gulshan Kumar (IIIT Ranchi)**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://realtimechatapp-ashen.vercel.app/login)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/gulshan29-kumar/real_time_chat_app)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Socket.IO](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socketdotio)](https://socket.io/)

🔗 **Live Deployment**: **[QuickChat | Real-Time Chat by Gulshan Kumar](https://realtimechatapp-ashen.vercel.app/login)**

---

## 🌟 Overview

**QuickChat** is an end-to-end real-time communication platform engineered with a sleek, dark glassmorphic design system. It allows users to create accounts, customize profiles with avatars and bios, discover active users with live presence indicators, exchange instantaneous text messages and images via WebSockets, and track unread message counts.

---

## 👨‍💻 Developer Profile

- **Author**: Gulshan Kumar
- **Institution**: Indian Institute of Information Technology (IIIT) Ranchi
- **GitHub**: [gulshan29-kumar](https://github.com/gulshan29-kumar)
- **Repository**: [real_time_chat_app](https://github.com/gulshan29-kumar/real_time_chat_app.git)
- **Live Demo**: [QuickChat | Real-Time Chat by Gulshan Kumar](https://realtimechatapp-ashen.vercel.app/login)

---

## 🚀 Key Features

- **⚡ Real-Time Instant Messaging**: Powered by Socket.IO for low-latency, bidirectional message delivery.
- **🟢 Live Online Presence**: Immediate online/offline indicator for all connected peers.
- **🎨 Glassmorphic Dark UI**: Deep dark slate/indigo aesthetics with glowing accents and smooth micro-animations.
- **🖼️ Image & Media Sharing**: Upload and exchange photos seamlessly with Cloudinary storage.
- **🛡️ Secure Authentication**: JSON Web Token (JWT) based login and signup with password hashing.
- **📱 Responsive Across Devices**: Tailored fluid layouts for desktop, tablet, and mobile screens.
- **📬 Unread Message Badges**: Real-time counter of unread messages per contact.
- **☁️ Deployment Ready**: Live on Vercel with serverless API and same-origin routing.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (Glassmorphic Theme + Custom Scrollbars)
- **Icons & UI**: React Hot Toast, Custom SVG Icons
- **Real-Time Client**: `socket.io-client`
- **Routing**: `react-router-dom` v7
- **HTTP Client**: `axios`

### Backend (`/server`)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5
- **WebSockets**: Socket.IO 4
- **Database**: MongoDB (Mongoose ODM)
- **File Uploads**: Cloudinary
- **Security**: `bcryptjs` (Password Hashing) & `jsonwebtoken` (Auth Tokens)

---

## 📂 Project Structure

```
project1/
├── client/                     # Frontend SPA (React + Vite)
│   ├── context/                # AuthContext & ChatContext
│   ├── public/                 # Static assets & favicons
│   ├── src/
│   │   ├── assets/             # Images, sample data, and icons
│   │   ├── components/         # Sidebar, ChatContainer, RightSidebar
│   │   ├── lib/                # Utility helpers
│   │   ├── pages/              # LoginPage, HomePage, ProfilePage
│   │   ├── App.jsx             # Route definitions & background mesh
│   │   ├── index.css           # Glassmorphism design tokens & styles
│   │   └── main.jsx            # React root mount
│   ├── index.html              # HTML entry with custom typography
│   ├── package.json            # Client dependencies & scripts
│   ├── vercel.json             # Vercel SPA rewrite config
│   └── vite.config.js          # Vite build config
├── server/                     # Backend API & Socket Server
│   ├── controllers/            # User and Message controllers
│   ├── lib/                    # MongoDB and Cloudinary config
│   ├── middleware/             # JWT auth middleware
│   ├── models/                 # User and Message schemas
│   ├── routes/                 # Express API routes
│   ├── package.json            # Server dependencies & scripts
│   └── server.js               # Main server & Socket.IO initialization
├── api/                        # Vercel Serverless Function entrypoint
│   └── index.js
├── .gitignore                  # Git ignore rules
├── package.json                # Monorepo root scripts & dependencies
├── vercel.json                 # Monorepo root Vercel configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables

### Client (`client/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
```
*(On Vercel, this can be left blank for same-origin routing, or set to your live backend domain)*

### Server (`server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

---

## 💻 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/gulshan29-kumar/real_time_chat_app.git
cd real_time_chat_app
```

### 2. Install Dependencies
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Run Development Servers
```bash
# In terminal 1 (Server):
cd server
npm run server

# In terminal 2 (Client):
cd client
npm run dev
```

The application will be accessible at `http://localhost:5173`.

---

## 🚀 Live Production Deployment

- **Live URL**: **[https://realtimechatapp-ashen.vercel.app/login](https://realtimechatapp-ashen.vercel.app/login)**
- **Platform**: Vercel
- **Continuous Deployment**: Automated on every push to `main` branch.

---

## 📄 License

This project was developed by Gulshan Kumar (IIIT Ranchi). Feel free to explore and build upon it!
