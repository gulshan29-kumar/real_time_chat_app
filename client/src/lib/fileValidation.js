/**
 * Image attachment validation
 */
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const isValidImageFile = (file) => {
  return file && ALLOWED_IMAGE_TYPES.includes(file.type);
};
