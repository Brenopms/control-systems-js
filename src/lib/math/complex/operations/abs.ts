import { Complex } from '../complex';
import { isComplex } from '../utils/isComplex';

export const abs = (value: number | Complex) => {
  if (isComplex(value)) {
    const sumOfQuadratic = Math.pow(value.re, 2) + Math.pow(value.im, 2);
    const result = Math.sqrt(sumOfQuadratic);
    return result;
  }

  return Math.abs(value);
};
