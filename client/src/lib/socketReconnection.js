/**
 * Socket Reconnection Strategy
 */
export const attachSocketListeners = (socket, onReconnect) => {
  if (!socket) return;
  window.addEventListener('online', () => {
    if (!socket.connected) {
      socket.connect();
      if (onReconnect) onReconnect();
    }
  });
};
