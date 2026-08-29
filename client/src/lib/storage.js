/**
 * Safe LocalStorage helper with fallback
 */
export const safeStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, val) => {
    try {
      localStorage.setItem(key, val);
    } catch {}
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {}
  }
};
