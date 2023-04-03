import { complex, Complex } from '../complex';

import { isNumber } from './isNumber';

/**
 * Return a Complex value or an array of complex values
 */
type ToComplexReturn<T> = T extends number ? Complex : Complex[];

/**
 * Transform a real number or an array of numbers into a Complex one
 * @param value
 * @returns Complex or Array of Complex
 */
export const toComplex = <T extends number | number[]>(value: T): ToComplexReturn<T> => {
  if (isNumber(value)) {
    return complex(value, 0) as ToComplexReturn<T>;
  }

  if (Array.isArray(value)) {
    return value.map((v) => complex(v, 0)) as ToComplexReturn<T>;
  }

  throw new Error(`Invalid types: ${value}`);
};
