# QuickChat REST API Specification

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup`: Register new user (`fullName`, `email`, `password`, `bio`)
- `POST /api/auth/login`: Authenticate existing user (`email`, `password`)
- `GET /api/auth/check`: Check current JWT session token
- `PUT /api/auth/update-profile`: Update user avatar, name, and biography

### Messages Routes (`/api/messages`)
- `GET /api/messages/users`: Fetch sidebar user list and unread counts
- `GET /api/messages/:userId`: Fetch conversation history with a peer
- `POST /api/messages/send/:userId`: Send a message or image to a peer
- `PUT /api/messages/mark/:messageId`: Mark message as read
