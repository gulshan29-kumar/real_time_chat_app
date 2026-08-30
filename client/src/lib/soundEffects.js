/**
 * Audio notification utility
 */
export const playNotificationSound = () => {
  try {
    const audio = new Audio('/assets/notification.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  } catch {}
};
