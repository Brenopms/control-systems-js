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

  it('Should calculate the points for a stable response', () => {
    const timeRange = [5.1];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0)],
      denominator: [complex(1, 0), complex(3, 0), complex(5, 0), complex(1, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);
    console.log(points);

    expect(points[0].x).toBe(5.1);
    expect(points[0].y).toBeCloseTo(2.0057);
  });

  it('Should calculate the points for an unstable response', () => {
    const timeRange = [1];
    const tf: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(-2, 0), complex(1, 0), complex(1, 0)],
    };

    const points = step.calculatePoints(tf, timeRange);
    console.log(points);

    expect(points[0].x).toBe(1);
    expect(points[0].y).toBeCloseTo(-0.31044);
  });
});
