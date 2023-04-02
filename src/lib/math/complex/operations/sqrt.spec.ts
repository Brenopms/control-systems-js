import { describe, expect, it } from 'vitest';

import { complex } from '../complex';

import { sqrt } from './sqrt';

describe('sqrt', () => {
  it('Should be able to calculate de square root of a real number', () => {
    const value = 4;
    const result = sqrt(value);
    const expectedResult = 2;

    expect(result).toBeCloseTo(expectedResult);
  });

  it('Should be able to calculate de square root of a float number', () => {
    const value = 2;
    const result = sqrt(value);
    const expectedResult = 1.4142;

    expect(result).toBeCloseTo(expectedResult);
  });

  it('Should be able to calculate de square root of a complex number', () => {
    const value = complex(2, 1);
    const result = sqrt(value);
    const expectedResult = complex(1.4553, 0.3436);

    expect(result.re).toBeCloseTo(expectedResult.re);
    expect(result.im).toBeCloseTo(expectedResult.im);
  });

  it('Should be able to calculate de square root of a negative complex number', () => {
    const value = complex(-2, 1);
    const result = sqrt(value);
    const expectedResult = complex(0.3436, 1.4553);

    expect(result.re).toBeCloseTo(expectedResult.re);
    expect(result.im).toBeCloseTo(expectedResult.im);
  });
});
