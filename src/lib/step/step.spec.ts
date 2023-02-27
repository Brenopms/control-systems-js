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

import { Step } from './step';
import { IStep } from './step.entities';

describe('Step class', () => {
  let step: IStep;
  let calculateTf: ICalculateTransferFunction;
  let inverseLaplace: IInverseLaplace;
  let convolution: IConvolution;
  let polOps: IPolynomialOperations;

  beforeEach(() => {
    calculateTf = new CalculateTransferFunction();
    inverseLaplace = new GaverStehfest();
    polOps = new PolynomialOperations();
    convolution = new Convolution(polOps);
    step = new Step(calculateTf, inverseLaplace, convolution);
  });

  it('Should calculate the points for a stable response (s + 2)/(2s + 1)', () => {
    const timeRange = [0, 0.5, 1.0, 1.5, 2.0];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(1, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);
    const expectedPoints = [0.5, 0.8318, 1.0902, 1.2915, 1.4482];

    // Points should match
    points.forEach((point, index) => {
      expect(point?.x).toBeCloseTo(timeRange[index]);
      expect(point?.y).toBeCloseTo(expectedPoints[index]);
    });
  });

  it('Should calculate the points for a stable response (s^2 + 3s + 4)/(2s^3 + 5s^2 + 6s + 8)', () => {
    const timeRange = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(4, 0)],
      denominator: [complex(2, 0), complex(5, 0), complex(6, 0), complex(8, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);
    const expectedPoints = [
      0, 0.6758, 0.4364, 0.5137, 0.5044, 0.4916, 0.5072, 0.4951, 0.5029, 0.4985, 0.5007, 0.4997, 0.5001,
    ];

    // Points should match
    // TODO: check inverse laplace implementation, to improve precision
    points.forEach((point, index) => {
      expect(point?.x).toBeCloseTo(timeRange[index], 1);
      expect(point?.y).toBeCloseTo(expectedPoints[index], 1);
    });
  });

  it('Should calculate the points for a stable response (s + 3)/(s^3 + 3s^2 + 5s + 1)', () => {
    const timeRange = [5.1];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0)],
      denominator: [complex(1, 0), complex(3, 0), complex(5, 0), complex(1, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);

    expect(points[0].x).toBe(5.1);
    expect(points[0].y).toBeCloseTo(2.0057);
  });

  it('Should calculate the points for an unstable response (1)/(-2s^2 + s + 1)', () => {
    const timeRange = [1];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(-2, 0), complex(1, 0), complex(1, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);

    expect(points[0].x).toBe(1);
    expect(points[0].y).toBeCloseTo(-0.31044);
  });
});
