/**
 * User contact item memoization helper
 */
export const userItemPropsAreEqual = (prev, next) => {
  return prev.user._id === next.user._id &&
         prev.isOnline === next.isOnline &&
         prev.unread === next.unread &&
         prev.isSelected === next.isSelected;
};
