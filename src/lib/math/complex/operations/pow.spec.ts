import { describe, expect, it } from 'vitest';

import { Complex } from '../complex';

import { pow } from './pow';

describe('pow', () => {
  const EPSILON = 1e-10;

  it('should be able to calculate the power of a real number with positive real exponent', () => {
    const base: Complex = { re: 2, im: 0 };
    const exponent = { re: 2, im: 0 };
    const result = pow(base, exponent);
    const expected: Complex = { re: 4, im: 0 };

    expect(result.re).toBeCloseTo(expected.re, EPSILON);
    expect(result.im).toBeCloseTo(expected.im, EPSILON);
  });

  it('should be able to calculate the power of a real number with negative real exponent', () => {
    const base: Complex = { re: 2, im: 0 };
    const exponent = { re: -2, im: 0 };
    const result = pow(base, exponent);
    const expected: Complex = { re: 0.25, im: 0 };

    expect(result.re).toBeCloseTo(expected.re, EPSILON);
    expect(result.im).toBeCloseTo(expected.im, EPSILON);
  });

  it('should be able to calculate the power of a complex number with a positive real exponent', () => {
    const base: Complex = { re: 2, im: 1 };
    const exponent = { re: 2, im: 0 };
    const result = pow(base, exponent);
    const expected: Complex = { re: 3, im: 4 };

    expect(result.re).toBeCloseTo(expected.re, EPSILON);
    expect(result.im).toBeCloseTo(expected.im, EPSILON);
  });

  it('should be able to calculate the power of a complex number with a negative real exponent', () => {
    const base: Complex = { re: 2, im: 1 };
    const exponent = { re: -2, im: 0 };
    const result = pow(base, exponent);
    const expected: Complex = { re: 0.0909090909, im: -0.1212121212 };

    expect(result.re).toBeCloseTo(expected.re, EPSILON);
    expect(result.im).toBeCloseTo(expected.im, EPSILON);
  });

  it('should be able to calculate the power of a complex number with a complex exponent', () => {
    const base: Complex = { re: 2, im: 1 };
    const exponent = { re: 2, im: 1 };
    const result = pow(base, exponent);
    const expected: Complex = { re: -0.5048, im: 3.1041 };

    expect(result.re).toBeCloseTo(expected.re, EPSILON);
    expect(result.im).toBeCloseTo(expected.im, EPSILON);
  });
});
