import { complex, Complex } from 'mathjs';

import { range } from '../helpers/range';
import { IPolynomialOperations } from '../math/polynomialOperations/PolynomialOperations.entities';
import { IRootFinding } from '../math/rootFinding/rootFinding';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { IRootLocus } from './rootLocus.entities';

const DEFAULT_GAINS = range(10);

export class RootLocus implements Partial<IRootLocus> {
  private readonly polOps: IPolynomialOperations;
  private readonly rootFinder: IRootFinding;

  constructor(polynomialOperations: IPolynomialOperations, rootFinder: IRootFinding) {
    this.polOps = polynomialOperations;
    this.rootFinder = rootFinder;
  }

  private calculateRoots = (coefficients: Complex[]) => {
    return this.rootFinder.findRoots(coefficients);
  };

  private getClosedLoopCoefficients(tf: TransferFunctionExpression, gain: number): Complex[] {
    const complexGain = complex(gain, 0);
    const closedLoopCoefficients = this.polOps.add(this.polOps.multiply([complexGain], tf.numerator), tf.denominator);
    return closedLoopCoefficients;
  }

  findRootLocus(tf: TransferFunctionExpression, gains = DEFAULT_GAINS) {
    const rlocusRoots = gains.map((gain) => {
      const coefficients = this.getClosedLoopCoefficients(tf, gain);
      const roots = this.calculateRoots(coefficients);
      return roots;
    });

    return rlocusRoots;
  }
}
