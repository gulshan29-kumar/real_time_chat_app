/**
 * Payload Sanitizer Helper
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};
