import { describe, expect, it } from 'vitest';

import { Complex } from '../complex';

import { divide } from './divide';

describe('divide function', () => {
  it('should be able to divide two complex numbers', () => {
    const a: Complex = { re: 1, im: 2 };
    const b: Complex = { re: 3, im: 4 };
    const result = divide(a, b);
    expect(result).toEqual({ re: 0.44, im: 0.08 });
  });

  it('should be able to divide a complex number and a real number', () => {
    const a: Complex = { re: 1, im: 2 };
    const b = 2;
    const result = divide(a, b);
    expect(result).toEqual({ re: 0.5, im: 1 });
  });

  it('should be able to divide a real number and a complex number', () => {
    const a = 2;
    const b: Complex = { re: 1, im: 2 };
    const result = divide(a, b);
    expect(result).toEqual({ re: 0.4, im: -0.8 });
  });

  it('should be able to divide two real numbers', () => {
    const a = 2;
    const b = 4;
    const result = divide(a, b);
    expect(result).toEqual(0.5);
  });

  it('should throw when given wrong input types', () => {
    const a = 'not a number';
    const b: Complex = { re: 3, im: 2 };
    expect(() => divide(a as any, b)).toThrowError(
      'Wrong type values for operation a: not a number, b: [object Object]'
    );
  });
});
