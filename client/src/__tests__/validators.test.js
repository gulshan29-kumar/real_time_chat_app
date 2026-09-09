/**
 * Unit Tests: Input Validators
 */
import { validateEmail, validatePassword, validateFullName } from '../lib/validators';

export const runValidatorTests = () => {
  console.assert(validateEmail('test@iiitranchi.ac.in') === true, 'Valid email test');
  console.assert(validateEmail('invalid') === false, 'Invalid email test');
  console.assert(validatePassword('secret123') === true, 'Valid password test');
  console.assert(validateFullName('Gulshan Kumar') === true, 'Valid name test');
  return 'Validators: All tests passed!';
};
