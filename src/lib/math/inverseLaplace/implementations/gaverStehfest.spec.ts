import { beforeEach, describe, expect, it } from 'vitest';

import { TransferFunctionExpression } from '../../../transferFunction/transferFunction.entities';
import { CalculateTransferFunction } from '../../calculateTransferFunction/implementations/calculateTransferFunction';
import { complex } from '../../complex';
import { IInverseLaplace } from '../inverseLaplace.entities';

import { GaverStehfest } from './gaverStehfest';

describe('GaverStehfest class', () => {
  const calculateTransferFunction = new CalculateTransferFunction();
  let gaverStehfest: IInverseLaplace;

  beforeEach(() => {
    gaverStehfest = new GaverStehfest();
  });

  it('Should be able to apply inverse laplace and evaluate it to a first order function', () => {
    // 2 / (-5s + 3)
    // −2/5* e ^(3/5 * t), t=1
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(2, 0)],
      denominator: [complex(-5, 0), complex(3, 0)],
    };
    const timeDomainResult = gaverStehfest.execute(
      (s) => calculateTransferFunction.calculateValue(transferFunction, s),
      1
    );
    expect(timeDomainResult).toBeCloseTo(-0.728847);
  });

  it('Should be able to apply inverse laplace and evaluate it to a third order function', () => {
    // 1 / (s^3)
    // (t^2)/2, t=10
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(1, 0), complex(0, 0), complex(0, 0)],
    };
    const timeDomainResult = gaverStehfest.execute(
      (s) => calculateTransferFunction.calculateValue(transferFunction, s),
      10
    );
    expect(timeDomainResult).toBeCloseTo(10);
  });

  it('Should be able to apply inverse laplace and evaluate it to a third order functio, that return an oscilatory function', () => {
    // 1 / (s^3 + 4s)
    // 1/4(1-cos2t), t=pi/2
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(1, 0), complex(0, 0), complex(4, 0), complex(0, 0)],
    };
    const timeDomainResult = gaverStehfest.execute(
      (s) => calculateTransferFunction.calculateValue(transferFunction, s),
      Math.PI / 2
    );
    expect(timeDomainResult).toBeCloseTo(0.5);
  });

  it('Should be able to apply inverse laplace and evaluate it to a fourth order function', () => {
    // 1 / (s^3)
    // 3/2 * t * sin t, t=pi/2
    const transferFunction: TransferFunctionExpression = {
      numerator: [complex(3, 0), complex(0, 0)],
      denominator: [complex(1, 0), complex(0, 0), complex(2, 0), complex(0, 0), complex(1, 0)],
    };
    const timeDomainResult = gaverStehfest.execute(
      (s) => calculateTransferFunction.calculateValue(transferFunction, s),
      Math.PI / 2
    );
    expect(timeDomainResult).toBeCloseTo((3 * Math.PI) / 4);
  });
});
