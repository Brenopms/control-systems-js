import { complex } from 'mathjs';
import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { IPolynomialOperations } from '../polynomialOperations/PolynomialOperations.entities';
import { PolynomialOperations } from '../polynomialOperations/implementations/PolynomialOperations';

import { Convolution } from './convolution';
import { IConvolution } from './convolution.entities';

describe('IConvolution', () => {
  let convolution: IConvolution;
  let polOps: IPolynomialOperations;
  let polOpsMultiplySpy: SpyInstance<
    [pol1: (number | math.Complex)[], pol2: (number | math.Complex)[]],
    (number | math.Complex)[]
  >;

  beforeEach(() => {
    polOps = new PolynomialOperations();
    polOpsMultiplySpy = vi.spyOn(polOps, 'multiply');
    convolution = new Convolution(polOps);
  });

  const transformToComplex = (arr: number[]) => arr.map((item) => complex(item, 0));

  it('should return the convolved transfer function', () => {
    /**
     *  (s^2 + 2s + 3)/(2s^2 + 3s + 4) convolves  (4s^2 + 5s + 6)/(5s^2 + 6s + 7)
     */

    const tf1 = { numerator: transformToComplex([1, 2, 3]), denominator: transformToComplex([2, 3, 4]) };
    const tf2 = { numerator: transformToComplex([4, 5, 6]), denominator: transformToComplex([5, 6, 7]) };

    polOpsMultiplySpy.mockReturnValueOnce([4, 13, 28, 27, 18]);
    polOpsMultiplySpy.mockReturnValueOnce([10, 27, 57, 63, 52, 28]);

    const expected = { numerator: [4, 13, 28, 27, 18], denominator: [10, 27, 57, 63, 52, 28] };
    expect(convolution.execute(tf1, tf2)).toEqual(expected);
  });

  it('should return the correct convolved transfer function for a transfer function with constant numerator and denominator', () => {
    /**
     * 2/2 convolves 3/3
     */
    const tf1 = { numerator: transformToComplex([2]), denominator: transformToComplex([2]) };
    const tf2 = { numerator: transformToComplex([3]), denominator: transformToComplex([3]) };

    const expected = { numerator: [6], denominator: [6] };

    polOpsMultiplySpy.mockReturnValueOnce([6]);
    polOpsMultiplySpy.mockReturnValueOnce([6]);

    expect(convolution.execute(tf1, tf2)).toEqual(expected);
  });
});
