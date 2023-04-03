import { Complex } from '../complex';

/**
 * Check if the real and imaginary part of a number is zero
 * @param complex
 * @returns
 */
export const isZero = (complex: Complex): boolean => {
  return complex.re === 0 && complex.im === 0;
};
