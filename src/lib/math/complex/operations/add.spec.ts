import { describe, expect, it } from 'vitest';

import { Complex } from '../complex';

import { add } from './add';

describe('add function', () => {
  // Complex + Complex
  it('Should be able to add two complex numbers', () => {
    const a: Complex = { re: 1, im: 2 };
    const b: Complex = { re: 3, im: 4 };
    const result: Complex = { re: 4, im: 6 };
    expect(add(a, b)).toEqual(result);
  });

  // Complex + Number
  it('Should be able to add a complex number and a number', () => {
    const a: Complex = { re: 1, im: 2 };
    const b = 3;
    const result: Complex = { re: 4, im: 2 };
    expect(add(a, b)).toEqual(result);
  });

  // Number + Complex
  it('Should be able to add a number and a complex number', () => {
    const a = 3;
    const b: Complex = { re: 1, im: 2 };
    const result: Complex = { re: 4, im: 2 };
    expect(add(a, b)).toEqual(result);
  });

  // Number + Number
  it('Should be able to add two numbers', () => {
    const a = 1;
    const b = 2;
    const result = 3;
    expect(add(a, b)).toEqual(result);
  });

  // Invalid input
  it('Should throw an error if given invalid input', () => {
    const a = 'a';
    const b = 'b';
    expect(() => add(a as any, b as any)).toThrow('Wrong type values for operation a: a, b: b');
  });
});
