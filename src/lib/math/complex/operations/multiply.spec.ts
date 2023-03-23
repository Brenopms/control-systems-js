import { describe, expect, it } from 'vitest';

import { Complex } from '../complex';

import { multiply } from './multiply';

describe('multiply', () => {
  it('Should be able to multiply two complex numbers', () => {
    const a: Complex = { re: 3, im: 2 };
    const b: Complex = { re: 1, im: 4 };
    const result = multiply(a, b);
    expect(result).toEqual({ re: -5, im: 14 });
  });

  it('Should be able to multiply a complex number and a real number', () => {
    const a: Complex = { re: 3, im: 2 };
    const b = 2;
    const result = multiply(a, b);
    expect(result).toEqual({ re: 6, im: 4 });
  });

  it('Should be able to multiply a real number and a complex number', () => {
    const a = 2;
    const b: Complex = { re: 3, im: 2 };
    const result = multiply(a, b);
    expect(result).toEqual({ re: 6, im: 4 });
  });

  it('Should be able to multiply two real numbers', () => {
    const a = 2;
    const b = 3;
    const result = multiply(a, b);
    expect(result).toEqual(6);
  });

  it('Should throw error when given wrong input types', () => {
    const a = 'not a number';
    const b: Complex = { re: 3, im: 2 };
    expect(() => multiply(a as any, b)).toThrowError(
      'Wrong type values for operation a: not a number, b: [object Object]'
    );
  });
});
