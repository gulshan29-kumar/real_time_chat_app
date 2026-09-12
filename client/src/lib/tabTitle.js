/**
 * Dynamic Tab Title for Unread Messages
 */
export const updateTabTitle = (unreadCount) => {
  if (unreadCount > 0) {
    document.title = `(${unreadCount}) QuickChat - New Message`;
  } else {
    document.title = 'QuickChat | Real-Time Chat by Gulshan Kumar';
  }
};
