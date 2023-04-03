import { complex, Complex } from '../complex';
import { isNumber } from '../utils/isNumber';

import { abs } from './abs';

/**
 * Calculates the square root of a number
 * @param value
 */
export function sqrt(value: number): number;
export function sqrt(value: Complex): Complex;
export function sqrt(value: number | Complex): number | Complex {
  if (isNumber(value)) {
    return Math.sqrt(value);
  }

  let resultRe: number;
  let resultIm: number;

  const { re, im } = value;
  const absValue = abs(value);

  if (re >= 0) {
    if (im === 0) {
      return complex(Math.sqrt(re), 0);
    }

    resultRe = 0.5 * Math.sqrt(2.0 * (absValue + re));
  } else {
    resultRe = Math.abs(im) / Math.sqrt(2 * (absValue - re));
  }

  if (re <= 0) {
    resultIm = 0.5 * Math.sqrt(2.0 * (absValue - re));
  } else {
    resultIm = Math.abs(im) / Math.sqrt(2 * (absValue + re));
  }

  resultIm = im < 0 ? -resultIm : resultIm;

  return complex(resultRe, resultIm);
}
