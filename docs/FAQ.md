# QuickChat FAQ & Troubleshooting

### 1. WebSockets not connecting?
- Check that `VITE_BACKEND_URL` is configured without a trailing slash.
- Ensure backend server is reachable at `/api/status`.

### 2. Images not uploading?
- Verify Cloudinary credentials in `server/.env`.
- Ensure files are standard image formats (JPEG, PNG, WEBP) under 4MB.
