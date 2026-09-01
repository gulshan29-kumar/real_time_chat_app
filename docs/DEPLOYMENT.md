# QuickChat Deployment Guide

### Vercel (Frontend SPA)
- Set root directory to `client` or use root with provided `vercel.json`.
- Add environment variable `VITE_BACKEND_URL`.

### Render / Railway (Backend Server)
- Deploy `server/` as a Node web service.
- Set `MONGODB_URI`, `JWT_SECRET`, `CLOUDINARY_*`.
