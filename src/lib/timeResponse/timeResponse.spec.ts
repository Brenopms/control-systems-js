import { beforeEach, describe, expect, it } from 'vitest';

import type { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from '../math/calculateTransferFunction/implementations/calculateTransferFunction';
import { complex } from '../math/complex';
import { Convolution } from '../math/convolution/convolution';
import type { IConvolution } from '../math/convolution/convolution.entities';
import { GaverStehfest } from '../math/inverseLaplace/implementations/gaverStehfest';
import type { IInverseLaplace } from '../math/inverseLaplace/inverseLaplace.entities';
import { PolynomialOperations } from '../math/polynomialOperations/implementations/PolynomialOperations';
import type { IPolynomialOperations } from '../math/polynomialOperations/PolynomialOperations.entities';
import type { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { TimeResponse } from './timeResponse';
import type { ITimeResponse } from './timeResponse.entities';

describe('TimeResponse class', () => {
  let timeResponse: ITimeResponse;
  let calculateTf: ICalculateTransferFunction;
  let inverseLaplace: IInverseLaplace;
  let convolution: IConvolution;
  let polOps: IPolynomialOperations;

  beforeEach(() => {
    calculateTf = new CalculateTransferFunction();
    inverseLaplace = new GaverStehfest();
    polOps = new PolynomialOperations();
    convolution = new Convolution(polOps);
    timeResponse = new TimeResponse(calculateTf, inverseLaplace, convolution);
  });

  describe('step response', () => {
    it('Should calculate the points for a stable response (s + 2)/(2s + 1)', () => {
      const timeRange = [0, 0.5, 1.0, 1.5, 2.0];
      const tf: TransferFunctionExpression = {
        numerator: [complex(1, 0), complex(2, 0)],
        denominator: [complex(2, 0), complex(1, 0)],
      };

      const points = timeResponse.step(tf, timeRange);
      const expectedPoints = [0.5, 0.8318, 1.0902, 1.2915, 1.4482];

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

      const points = timeResponse.step(tf, timeRange);
      const expectedPoints = [
        0, 0.6758, 0.4364, 0.5137, 0.5044, 0.4916, 0.5072, 0.4951, 0.5029, 0.4985, 0.5007, 0.4997, 0.5001,
      ];

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

      const points = timeResponse.step(tf, timeRange);

      expect(points[0].x).toBe(5.1);
      expect(points[0].y).toBeCloseTo(2.0057);
    });

    it('Should calculate the points for an unstable response (1)/(-2s^2 + s + 1)', () => {
      const timeRange = [1];
      const tf: TransferFunctionExpression = {
        numerator: [complex(1, 0)],
        denominator: [complex(-2, 0), complex(1, 0), complex(1, 0)],
      };

      const points = timeResponse.step(tf, timeRange);

      expect(points[0].x).toBe(1);
      expect(points[0].y).toBeCloseTo(-0.31044);
    });
  });

  describe('impulse response', () => {
    it('Should calculate the points for a stable response (s^2 + 3s + 4)/(2s^3 + 5s^2 + 6s + 8)', () => {
      const timeRange = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30];
      const tf: TransferFunctionExpression = {
        numerator: [complex(1, 0), complex(3, 0), complex(4, 0)],
        denominator: [complex(2, 0), complex(5, 0), complex(6, 0), complex(8, 0)],
      };

      const points = timeResponse.impulse(tf, timeRange);
      const expectedPoints = [
        5.0e-1, -2.4265e-1, 1.6046e-1, -9.2126e-2, 4.7065e-2, -2.1134e-2, 7.8584e-3, -1.8808e-3, -3.5213e-4, 8.9446e-4,
        -8.0239e-4, 5.5403e-4, -3.2961e-4,
      ];

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

      const points = timeResponse.impulse(tf, timeRange);

      const expectedPoints = [
        0, 0.4275, 0.2331, 0.1314, 0.0741, 0.0418, 0.0236, 0.0133, 0.0075, 0.0042, 0.0024, 0.0013, 0.0008,
      ];

      // TODO: check inverse laplace implementation, to improve precision
      points.forEach((point, index) => {
        expect(point?.x).toBeCloseTo(timeRange[index], 1);
        expect(point?.y).toBeCloseTo(expectedPoints[index], 1);
      });
    });
  });

  describe('general input signal', () => {
    it('Should match the step response when driven by the step input signal 1/s', () => {
      const timeRange = [0, 0.5, 1.0, 1.5, 2.0];
      const tf: TransferFunctionExpression = {
        numerator: [complex(1, 0), complex(2, 0)],
        denominator: [complex(2, 0), complex(1, 0)],
      };
      const stepInput: TransferFunctionExpression = {
        numerator: [complex(1, 0)],
        denominator: [complex(1, 0), complex(0, 0)],
      };

      const general = timeResponse.calculatePoints(tf, stepInput, timeRange);
      const step = timeResponse.step(tf, timeRange);

      expect(general).toEqual(step);
    });
  });
});
