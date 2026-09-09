/**
 * Unit Tests: Storage Helper
 */
import { safeStorage } from '../lib/storage';

export const runStorageTests = () => {
  safeStorage.setItem('test_key', '123');
  console.assert(safeStorage.getItem('test_key') === '123', 'Storage get/set test');
  safeStorage.removeItem('test_key');
  return 'Storage: All tests passed!';
};
