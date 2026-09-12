/**
 * Smooth scrolling helper with requestAnimationFrame
 */
export const scrollToBottomSmooth = (element) => {
  if (!element) return;
  requestAnimationFrame(() => {
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });
};
