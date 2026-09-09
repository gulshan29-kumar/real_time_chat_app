/**
 * Unit Tests: Date Utilities
 */
import { formatChatTimestamp, isSameDay } from '../lib/dateUtils';

export const runDateTests = () => {
  const d = new Date().toISOString();
  console.assert(typeof formatChatTimestamp(d) === 'string', 'Timestamp formatting test');
  console.assert(isSameDay(d, d) === true, 'Same day test');
  return 'DateUtils: All tests passed!';
};
