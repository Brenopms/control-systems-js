import { Complex } from '../complex';
import { isComplex } from '../utils/isComplex';
import { isNumber } from '../utils/isNumber';

/**
 * Subtract two numbers (a-b)
 * @param a
 * @param b
 */
export function subtract(a: Complex, b: Complex): Complex;
export function subtract(a: Complex, b: number): Complex;
export function subtract(a: number, b: Complex): Complex;
export function subtract(a: number, b: number): number;
export function subtract(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) && isComplex(b)) {
    return { re: a.re - b.re, im: a.im - b.im };
  }

  if (isComplex(a) && isNumber(b)) {
    return { re: a.re - b, im: a.im };
  }

  if (isNumber(a) && isComplex(b)) {
    return { re: a - b.re, im: -b.im };
  }

  if (isNumber(a) && isNumber(b)) {
    return a - b;
  }

  throw new Error(`Wrong type values for operation a: ${a}, b: ${b}`);
}
