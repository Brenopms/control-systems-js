import { complex, Complex } from '../complex';
import { ONE } from '../constants/one';
import { ZERO } from '../constants/zero';
import { isComplex } from '../utils/isComplex';
import { isNumber } from '../utils/isNumber';
import { isZero } from '../utils/isZero';

import { arg } from './arg';
import { logHypot } from './logHypot';

const complexPow = (base: Complex, exponent: Complex): Complex => {
  const expReal = exponent.re;
  const expIm = exponent.im;

  const { re, im } = base;

  if (isZero(exponent)) {
    return ONE;
  }

  // if exponent is real
  if (expIm === 0) {
    if (im === 0 && re > 0) {
      return { re: Math.pow(re, expReal), im: 0 };
    } else if (re === 0) {
      switch (((expReal % 4) + 4) % 4) {
        case 0:
          return { re: Math.pow(im, expReal), im: 0 };
        case 1:
          return { re: 0, im: Math.pow(im, expReal) };
        case 2:
          return { re: -Math.pow(im, expReal), im: 0 };
        case 3:
          return { re: 0, im: -Math.pow(im, expReal) };
      }
    }
  }

  if (isZero(base)) {
    return ZERO;
  }

  const argument = arg(base);
  const hypotLog = logHypot(base);

  const realResult = Math.exp(expReal * hypotLog - expIm * argument);
  const imResult = expIm * hypotLog + expReal * argument;

  return {
    re: realResult * Math.cos(imResult),
    im: realResult * Math.sin(imResult),
  };
};

/**
 * Calculates the power of a number, given an exponent (base)^exponent
 * @param base
 * @param exponent
 */
export function pow(base: Complex, exponent: Complex): Complex;
export function pow(base: number, exponent: Complex): Complex;
export function pow(base: Complex, exponent: number): Complex;
export function pow(base: number, exponent: number): number;
export function pow(base: number | Complex, exponent: number | Complex): number | Complex {
  if (isNumber(base) && isNumber(exponent)) {
    return Math.pow(base, exponent);
  }

  const complexBase = isComplex(base) ? base : complex(base, 0);
  const complexExponent = isComplex(exponent) ? exponent : complex(exponent, 0);

  return complexPow(complexBase, complexExponent);
}
