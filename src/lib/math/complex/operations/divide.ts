import { Complex } from '../complex';
import { isComplex } from '../utils/isComplex';
import { isNumber } from '../utils/isNumber';

export function divide(a: Complex, b: Complex): Complex;
export function divide(a: Complex, b: number): Complex;
export function divide(a: number, b: Complex): Complex;
export function divide(a: number, b: number): number;
export function divide(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) && isComplex(b)) {
    const denominator = b.re ** 2 + b.im ** 2;
    const re = (a.re * b.re + a.im * b.im) / denominator;
    const im = (a.im * b.re - a.re * b.im) / denominator;
    return { re, im };
  }

  if (isComplex(a) && isNumber(b)) {
    const re = a.re / b;
    const im = a.im / b;
    return { re, im };
  }

  if (isNumber(a) && isComplex(b)) {
    const denominator = b.re ** 2 + b.im ** 2;
    const re = (a * b.re) / denominator;
    const im = (-a * b.im) / denominator;
    return { re, im };
  }

  if (isNumber(a) && isNumber(b)) {
    return a / b;
  }

  throw new Error(`Wrong type values for operation a: ${a}, b: ${b}`);
}
