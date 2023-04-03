import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { Complex, toComplex } from '../complex';
import { IPolynomialOperations } from '../polynomialOperations/PolynomialOperations.entities';
import { PolynomialOperations } from '../polynomialOperations/implementations/PolynomialOperations';

import { Convolution } from './convolution';
import { IConvolution } from './convolution.entities';

describe('IConvolution', () => {
  let convolution: IConvolution;
  let polOps: IPolynomialOperations;
  let polOpsMultiplySpy: SpyInstance<[pol1: Complex[], pol2: Complex[]], Complex[]>;

  beforeEach(() => {
    polOps = new PolynomialOperations();
    polOpsMultiplySpy = vi.spyOn(polOps, 'multiply');
    convolution = new Convolution(polOps);
  });

  it('should return the convolved transfer function', () => {
    /**
     *  (s^2 + 2s + 3)/(2s^2 + 3s + 4) convolves  (4s^2 + 5s + 6)/(5s^2 + 6s + 7)
     */

    const tf1 = { numerator: toComplex([1, 2, 3]), denominator: toComplex([2, 3, 4]) };
    const tf2 = { numerator: toComplex([4, 5, 6]), denominator: toComplex([5, 6, 7]) };

    polOpsMultiplySpy.mockReturnValueOnce(toComplex([4, 13, 28, 27, 18]));
    polOpsMultiplySpy.mockReturnValueOnce(toComplex([10, 27, 57, 63, 52, 28]));

    const expected = { numerator: toComplex([4, 13, 28, 27, 18]), denominator: toComplex([10, 27, 57, 63, 52, 28]) };
    expect(convolution.execute(tf1, tf2)).toEqual(expected);
  });

  it('should return the correct convolved transfer function for a transfer function with constant numerator and denominator', () => {
    /**
     * 2/2 convolves 3/3
     */
    const tf1 = { numerator: toComplex([2]), denominator: toComplex([2]) };
    const tf2 = { numerator: toComplex([3]), denominator: toComplex([3]) };

    const expected = { numerator: toComplex([6]), denominator: toComplex([6]) };

    polOpsMultiplySpy.mockReturnValueOnce(toComplex([6]));
    polOpsMultiplySpy.mockReturnValueOnce(toComplex([6]));

    expect(convolution.execute(tf1, tf2)).toEqual(expected);
  });
});
