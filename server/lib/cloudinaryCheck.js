/**
 * Check base64 image payload size
 */
export const isBase64PayloadAllowed = (base64Str, maxBytes = 4 * 1024 * 1024) => {
  if (!base64Str) return true;
  return base64Str.length <= maxBytes;
};
