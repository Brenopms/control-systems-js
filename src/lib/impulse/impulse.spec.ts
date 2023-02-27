import { complex } from 'mathjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from '../math/calculateTransferFunction/implementations/calculateTransferFunction';
import { Convolution } from '../math/convolution/convolution';
import { IConvolution } from '../math/convolution/convolution.entities';
import { GaverStehfest } from '../math/inverseLaplace/implementations/gaverStehfest';
import { IInverseLaplace } from '../math/inverseLaplace/inverseLaplace.entities';
import { IPolynomialOperations } from '../math/polynomialOperations/PolynomialOperations.entities';
import { PolynomialOperations } from '../math/polynomialOperations/implementations/PolynomialOperations';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { Impulse } from './impulse';
import { IImpulse } from './impulse.entities';

describe('Step class', () => {
  let impulse: IImpulse;
  let calculateTf: ICalculateTransferFunction;
  let inverseLaplace: IInverseLaplace;
  let convolution: IConvolution;
  let polOps: IPolynomialOperations;

  beforeEach(() => {
    calculateTf = new CalculateTransferFunction();
    inverseLaplace = new GaverStehfest();
    polOps = new PolynomialOperations();
    convolution = new Convolution(polOps);
    impulse = new Impulse(calculateTf, inverseLaplace, convolution);
  });

  it('Should throw an error if the denominator order is not higher than numerator for a given tf', () => {
    const timeRange = [1, 2];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(4, 0)],
      denominator: [complex(2, 0), complex(5, 0), complex(6, 0)],
    };

    expect(() => impulse.calculatePoints(tf, timeRange)).toThrowError(
      `Denominator order should be higher than numerators for the transfer function. Tf: ${tf}`
    );
  });

  it('Should calculate the points for a stable response (s^2 + 3s + 4)/(2s^3 + 5s^2 + 6s + 8)', () => {
    const timeRange = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(4, 0)],
      denominator: [complex(2, 0), complex(5, 0), complex(6, 0), complex(8, 0)],
    };

    const points = impulse.calculatePoints(tf, timeRange);
    const expectedPoints = [
      5.0e-1, -2.4265e-1, 1.6046e-1, -9.2126e-2, 4.7065e-2, -2.1134e-2, 7.8584e-3, -1.8808e-3, -3.5213e-4, 8.9446e-4,
      -8.0239e-4, 5.5403e-4, -3.2961e-4,
    ];

    // Points should match
    // TODO: check inverse laplace implementation, to improve precision
    points.forEach((point, index) => {
      expect(point?.x).toBeCloseTo(timeRange[index], 1);
      expect(point?.y).toBeCloseTo(expectedPoints[index], 1);
    });
  });

  it('Should calculate the points for a stable response (s + 3)/(s^3 + 3s^2 + 5s + 1)', () => {
    const timeRange = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0)],
      denominator: [complex(1, 0), complex(3, 0), complex(5, 0), complex(1, 0)],
    };

    const points = impulse.calculatePoints(tf, timeRange);

    const expectedPoints = [
      0, 0.4275, 0.2331, 0.1314, 0.0741, 0.0418, 0.0236, 0.0133, 0.0075, 0.0042, 0.0024, 0.0013, 0.0008,
    ];

    // Points should match
    // TODO: check inverse laplace implementation, to improve precision
    points.forEach((point, index) => {
      expect(point?.x).toBeCloseTo(timeRange[index], 1);
      expect(point?.y).toBeCloseTo(expectedPoints[index], 1);
    });
  });
});
