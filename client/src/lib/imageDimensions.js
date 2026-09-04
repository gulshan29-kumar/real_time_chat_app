/**
 * Calculate image aspect ratio before dispatch
 */
export const getImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = URL.createObjectURL(file);
  });
};
