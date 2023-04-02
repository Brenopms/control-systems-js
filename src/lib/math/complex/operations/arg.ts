import { Complex } from '../complex';

export const arg = (value: Complex) => {
  return Math.atan2(value.im, value.re);
};
