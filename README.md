# ⚡ QuickChat - Full-Stack Real-Time Messaging Platform

> A modern, high-performance real-time chat application built by **Gulshan Kumar (IIIT Ranchi)**.

![QuickChat Preview](client/public/favicon.svg)

---

## 🌟 Overview

**QuickChat** is an end-to-end real-time communication platform engineered with a sleek, dark glassmorphic design system. It allows users to create accounts, customize profiles with avatars and bios, discover active users with live presence indicators, exchange instantaneous text messages and images via WebSockets, and track unread message counts.

---

## 👨‍💻 Developer Profile

- **Author**: Gulshan Kumar
- **Institution**: Indian Institute of Information Technology (IIIT) Ranchi
- **GitHub**: [gulshan29-kumar](https://github.com/gulshan29-kumar)
- **Repository**: [real_time_chat_app](https://github.com/gulshan29-kumar/real_time_chat_app.git)

---

## 🚀 Key Features

- **⚡ Real-Time Instant Messaging**: Powered by Socket.IO for low-latency, bidirectional message delivery.
- **🟢 Live Online Presence**: Immediate online/offline indicator for all connected peers.
- **🎨 Glassmorphic Dark UI**: Deep dark slate/indigo aesthetics with glowing accents and smooth micro-animations.
- **🖼️ Image & Media Sharing**: Upload and exchange photos seamlessly with Cloudinary storage.
- **🛡️ Secure Authentication**: JSON Web Token (JWT) based login and signup with password hashing.
- **📱 Responsive Across Devices**: Tailored fluid layouts for desktop, tablet, and mobile screens.
- **📬 Unread Message Badges**: Real-time counter of unread messages per contact.
- **☁️ Deployment Ready**: Pre-configured `vercel.json` and monorepo scripts for deployment on Vercel.

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
│   ├── server.js               # Main server & Socket.IO initialization
│   └── vercel.json             # Serverless routing config
├── .gitignore                  # Git ignore rules
├── package.json                # Monorepo root scripts
├── vercel.json                 # Monorepo root Vercel configuration
└── README.md                   # Project documentation
```

---

## ⚙️ Environment Variables

### Client (`client/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
```
*(When deployed, set `VITE_BACKEND_URL` to your production backend URL)*

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

## 🚀 Deploying to Vercel

### Option 1: Deploying the Frontend on Vercel (Recommended)
1. Push your repository to GitHub (`https://github.com/gulshan29-kumar/real_time_chat_app.git`).
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import `real_time_chat_app`.
4. In Project Settings:
   - **Root Directory**: `client` (or leave default with the root `vercel.json` included in this repo)
   - **Framework Preset**: Vite
   - **Environment Variables**:
     - `VITE_BACKEND_URL`: Your live backend server URL (e.g. deployed on Render, Railway, or Vercel).
5. Click **Deploy**.

### Option 2: Deploying the Server (Render / Railway / Fly)
Because Socket.IO requires persistent WebSocket connections, deploying the Node/Express backend to platforms like [Render.com](https://render.com) or [Railway.app](https://railway.app) provides the best real-time performance:
1. Create a Web Service pointing to the `server/` directory.
2. Build command: `npm install`
3. Start command: `node server.js`
4. Supply your `MONGODB_URI`, `JWT_SECRET`, and `CLOUDINARY_*` environment variables.
5. Copy the assigned URL and set it as `VITE_BACKEND_URL` on your Vercel client deployment.

---

## 📄 License

This project was developed by Gulshan Kumar (IIIT Ranchi). Feel free to explore and build upon it!
