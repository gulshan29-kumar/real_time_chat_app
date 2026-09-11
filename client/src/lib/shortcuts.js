/**
 * Keyboard shortcuts helper
 */
export const registerKeyboardShortcuts = ({ onEscape }) => {
  const handler = (e) => {
    if (e.key === 'Escape' && onEscape) onEscape();
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
};
