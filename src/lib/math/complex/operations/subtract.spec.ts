import { describe, expect, it } from 'vitest';

import type { Complex } from '../complex';

import { subtract } from './subtract';

describe('add function', () => {
  // Complex + Complex
  it('Should be able to subtract two complex numbers', () => {
    const a: Complex = { re: 1, im: 2 };
    const b: Complex = { re: 3, im: 4 };
    const result: Complex = { re: -2, im: -2 };
    expect(subtract(a, b)).toEqual(result);
  });

  // Complex + Number
  it('Should be able to subtract a complex number and a number', () => {
    const a: Complex = { re: 1, im: 2 };
    const b = 3;
    const result: Complex = { re: -2, im: 2 };
    expect(subtract(a, b)).toEqual(result);
  });

  // Number + Complex
  it('Should be able to subtract a number and a complex number', () => {
    const a = 3;
    const b: Complex = { re: 1, im: 2 };
    const result: Complex = { re: 2, im: -2 };
    expect(subtract(a, b)).toEqual(result);
  });

  // Number + Number
  it('Should be able to subtract two numbers', () => {
    const a = 1;
    const b = 2;
    const result = -1;
    expect(subtract(a, b)).toEqual(result);
  });

  // Invalid input
  it('Should throw an error if given invalid input', () => {
    const a = 'a' as unknown as Complex;
    const b = 'b' as unknown as Complex;
    expect(() => subtract(a, b)).toThrow('Wrong type values for operation a: a, b: b');
  });
});
