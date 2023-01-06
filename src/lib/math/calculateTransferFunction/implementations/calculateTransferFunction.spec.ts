import { complex } from 'mathjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { TransferFunctionExpression } from '../../../transferFunction/transferFunction.entities';
import { ICalculateTransferFunction } from '../calculateTransferFunction.entities';

import { CalculateTransferFunction } from './calculateTransferFunction';

describe('CalculateTransferFunction class', () => {
  let calculateTransferFunction: ICalculateTransferFunction;

  beforeEach(() => {
    calculateTransferFunction = new CalculateTransferFunction();
  });

  it('Should calculate correctly first order transfer functions', () => {
    // s / 2s
    const functionExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(0, 0)],
      denominator: [complex(2, 0), complex(0, 0)],
    };

    const s = complex(5, 0);

    const result = calculateTransferFunction.calculateValue(functionExpression, s);
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.5);
    expect(result.im).toBe(0);
  });

  it('Should calculate correctly second order transfer functions', () => {
    // (s^2 + 3 s + 2)/(s^2 + 4s + 5)
    const functionExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(2, 0)],
      denominator: [complex(1, 0), complex(4, 0), complex(5, 0)],
    };

    const s = complex(10, 0);

    const result = calculateTransferFunction.calculateValue(functionExpression, s);
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.9103);
    expect(result.im).toBe(0);
  });

  it('Should calculate correctly higher order transfer functions', () => {
    // (s^2 + 3 s + 2)/( 2s^3 + 4s^2 + 5 s + 5)
    const functionExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(4, 0), complex(5, 0), complex(5, 0)],
    };

    const s = complex(15, 0);

    const result = calculateTransferFunction.calculateValue(functionExpression, s);
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.03518);
    expect(result.im).toBe(0);
  });

  it('Should calculate correctly higher order transfer functions with complex numbers', () => {
    // (s^2 + 3 s + 2)/( 2s^3 + 4s^2 + 5 s + 5)
    const functionExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(3, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(4, 0), complex(5, 0), complex(5, 0)],
    };

    const s = complex(10, 1);

    const result = calculateTransferFunction.calculateValue(functionExpression, s);
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.05319);
    expect(result.im).toBeCloseTo(-0.00557);
  });
});
