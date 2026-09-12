/**
 * Offline alert trigger
 */
export const initOfflineNotifier = (toast) => {
  window.addEventListener('offline', () => {
    toast.error('Network disconnected. Attempting reconnect...', { id: 'network-alert' });
  });
  window.addEventListener('online', () => {
    toast.success('Connection restored!', { id: 'network-alert' });
  });
};
