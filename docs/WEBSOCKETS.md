# Socket.IO Event Reference

### Client to Server
- `connection`: Handshake query with `userId`.

### Server to Client
- `getOnlineUsers`: Array of online user ID strings.
- `newMessage`: Message object broadcasted to intended recipient socket.
