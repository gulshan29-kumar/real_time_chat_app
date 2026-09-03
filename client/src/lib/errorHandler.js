/**
 * Centralized client error messaging
 */
export const formatErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'An unexpected error occurred';
};
