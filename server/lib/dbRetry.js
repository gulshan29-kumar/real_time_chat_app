/**
 * MongoDB Retry Strategy
 * Author: Gulshan Kumar (IIIT Ranchi)
 */
export const retryConnection = async (fn, maxRetries = 3, delayMs = 2000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
};
