import { complex } from 'mathjs';
import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { TransferFunctionExpression } from '../../../build/main/lib/transferFunction/transferFunction.entities.d';
import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from '../math/calculateTransferFunction/implementations/calculateTransferFunction';

import { Nyquist } from './nyquist';
import { INyquist } from './nyquist.entities';

describe('Nyquist class', () => {
  let nyquist: INyquist;
  let calculateTransferFunction: ICalculateTransferFunction;
  let calculationSpy: SpyInstance<[transferFunction: TransferFunctionExpression, s: math.Complex], math.Complex>;

  beforeEach(() => {
    calculateTransferFunction = new CalculateTransferFunction();
    calculationSpy = vi.spyOn(calculateTransferFunction, 'calculateValue');
    nyquist = new Nyquist(calculateTransferFunction);
  });

  it('Should calculate correctly the real and imaginary data given a set of frequencies', () => {
    //  s + 2 / 2 s + 1
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(1, 0)],
    };

    const resultValues = { re: 2, im: -0.003 };

    calculationSpy.mockReturnValue(complex(resultValues.re, resultValues.im));

    const result = nyquist.calculatePoints(transferFunction, [0.001]);

    expect(result.points[0].x).toBeCloseTo(resultValues.re);
    expect(result.points[0].y).toBeCloseTo(resultValues.im);
  });

  it('Should flip correctly the corresponding points in the x-axis', () => {
    //  s + 2 / 2 s + 1
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(1, 0)],
    };

    const resultValues = { re: 2, im: -0.003 };

    calculationSpy.mockReturnValue(complex(resultValues.re, resultValues.im));

    const result = nyquist.calculatePoints(transferFunction, [0.001]);

    expect(result.correspondingPoints[0].x).toBeCloseTo(resultValues.re);
    expect(result.correspondingPoints[0].y).toBeCloseTo(-resultValues.im);
  });

  it('Should calculate correctly all the points if multiple frequencies are passed', () => {
    //  s + 3  /  s^3 + 3 s^2 + 5 s + 1
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0)],
      denominator: [complex(3, 0), complex(3, 0), complex(5, 0), complex(1, 0)],
    };

    const resultValues = [
      { re: 0.339726, im: -1.2274 },
      { re: -0.046653, im: -4.5231e-3 },
    ];

    calculationSpy.mockReturnValueOnce(complex(resultValues[0].re, resultValues[0].im));
    calculationSpy.mockReturnValueOnce(complex(resultValues[1].re, resultValues[1].im));

    const result = nyquist.calculatePoints(transferFunction, [0.5, 5]);

    expect(result.points[0].x).toBeCloseTo(resultValues[0].re);
    expect(result.points[0].y).toBeCloseTo(resultValues[0].im);
    expect(result.correspondingPoints[0].x).toBeCloseTo(resultValues[0].re);
    expect(result.correspondingPoints[0].y).toBeCloseTo(-resultValues[0].im);

    expect(result.points[1].x).toBeCloseTo(resultValues[1].re);
    expect(result.points[1].y).toBeCloseTo(resultValues[1].im);
    expect(result.correspondingPoints[1].x).toBeCloseTo(resultValues[1].re);
    expect(result.correspondingPoints[1].y).toBeCloseTo(-resultValues[1].im);
  });
});
