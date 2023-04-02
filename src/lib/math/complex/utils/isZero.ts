import { Complex } from '../complex';

export const isZero = (complex: Complex): boolean => {
  return complex.re === 0 && complex.im === 0;
};
