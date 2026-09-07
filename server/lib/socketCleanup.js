/**
 * Socket disconnection cleanup utility
 */
export const removeUserSocket = (userSocketMap, userId) => {
  if (userSocketMap[userId]) {
    delete userSocketMap[userId];
  }
};
