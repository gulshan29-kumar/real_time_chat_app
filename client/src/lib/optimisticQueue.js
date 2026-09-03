/**
 * Optimistic message queue helper
 * Manages provisional client-side message state before server ACK.
 */
export const createProvisionalMessage = (text, senderId, receiverId) => ({
  _id: 'temp_' + Date.now(),
  text,
  senderId,
  receiverId,
  createdAt: new Date().toISOString(),
  provisional: true
});
