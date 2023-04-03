import { beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { CalculateTransferFunction } from '../math/calculateTransferFunction/implementations/calculateTransferFunction';
import { Complex, complex } from '../math/complex';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { Bode } from './bode';
import { IBode } from './bode.entities';

describe('Bode Class', () => {
  let bode: IBode;
  let calculateTransferFunction: ICalculateTransferFunction;
  let calculationSpy: SpyInstance<[transferFunction: TransferFunctionExpression, s: Complex], Complex>;

  beforeEach(() => {
    calculateTransferFunction = new CalculateTransferFunction();
    calculationSpy = vi.spyOn(calculateTransferFunction, 'calculateValue');
    bode = new Bode(calculateTransferFunction);
  });

  it('Should calculate correctly the magnitude data given a set of frequencies', () => {
    //  s + 2 / 2 s + 1
    // f = bodemag(e, 10)
    // f = 0.5093
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(1, 0)],
    };
    calculationSpy.mockReturnValue(complex(0.5093, 0));

    const result = bode.calculatePoints(transferFunction, [10]);

    expect(result.magnitude[0]).toBeDefined();
    expect(result.magnitude[0].y).toBeCloseTo(-5.8611);
    expect(result.magnitude[0].x).toBe(10);
  });

  it('Should calculate correctly the phase data given a set of frequencies', () => {
    //  s + 2 / 2 s + 1
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0), complex(2, 0)],
      denominator: [complex(2, 0), complex(1, 0)],
    };
    calculationSpy.mockReturnValue(complex(0.5093, 10));

    const result = bode.calculatePoints(transferFunction, [10]);

    expect(result.magnitude[0]).toBeDefined();
    expect(result.magnitude[0].y).toBeCloseTo(20.011);
    expect(result.magnitude[0].x).toBe(10);
  });
});
