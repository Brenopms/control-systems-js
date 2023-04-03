import { Complex } from '../complex';

/**
 * Calculates the argument value of a complex number. Calculates atan2(im/re)
 * @param value
 * @returns
 */
export const arg = (value: Complex) => {
  return Math.atan2(value.im, value.re);
};
