import { Complex } from '../complex';
import { isComplex } from '../utils/isComplex';
import { isNumber } from '../utils/isNumber';

export function multiply(a: Complex, b: Complex): Complex;
export function multiply(a: Complex, b: number): Complex;
export function multiply(a: number, b: Complex): Complex;
export function multiply(a: number, b: number): number;
export function multiply(a: number | Complex, b: number | Complex): number | Complex {
  if (isComplex(a) && isComplex(b)) {
    const re = a.re * b.re - a.im * b.im;
    const im = a.re * b.im + a.im * b.re;
    return { im, re };
  }

  if (isComplex(a) && isNumber(b)) {
    const re = a.re * b;
    const im = a.im * b;
    return { im, re };
  }

  if (isNumber(a) && isComplex(b)) {
    const re = b.re * a;
    const im = b.im * a;
    return { im, re };
  }

  if (isNumber(a) && isNumber(b)) {
    return a * b;
  }

  throw new Error(`Wrong type values for operation a: ${a}, b: ${b}`);
}
