import { complex, Complex } from '../math/complex';
import { IPolynomialOperations } from '../math/polynomialOperations/PolynomialOperations.entities';
import { IRootFinding } from '../math/rootFinding/rootFinding';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { IRootLocus } from './rootLocus.entities';

/**
 * The root locus returns the closed-loop pole trajectories as a function of the feedback gain k (assuming negative feedback).
 *
 * Root locus are used to study the effects of varying feedback gains on closed-loop pole locations. In turn, these locations provide indirect information on the time and frequency responses.
 */
export class RootLocus implements Partial<IRootLocus> {
  private readonly polOps: IPolynomialOperations;
  private readonly rootFinder: IRootFinding;

  constructor(polynomialOperations: IPolynomialOperations, rootFinder: IRootFinding) {
    this.polOps = polynomialOperations;
    this.rootFinder = rootFinder;
  }

  /**
   * Calculate the roots for a given polynomial
   * @param coefficients Polynomial coefficients, ordered from the highest order to the the lowest
   */
  private calculateRoots = (coefficients: Complex[]) => {
    return this.rootFinder.findRoots(coefficients);
  };

  /**
   * Transform a given transfer function to a closed loop expression
   *
   *
   * It's done considering 1 + G(s)*H(s) = 0, where H(s) if the feedback transfer function and G(s) is the system transfer function
   * given by tf.numerator/tf.denominator.
   *
   * To find the correct closed loop expression this expression can be then simplified to:
   *
   * k*tf.numerator + tf.denominator = 0
   *
   * @param tf Transfer function
   * @param gain Feedback gain
   */
  private getClosedLoopCoefficients(tf: TransferFunctionExpression, gain: number): Complex[] {
    const complexGain = complex(gain, 0);
    const closedLoopCoefficients = this.polOps.add(this.polOps.multiply([complexGain], tf.numerator), tf.denominator);
    return closedLoopCoefficients;
  }

  /**
   * Calculate the root locus by finding the roots of 1+k*TF(s) where TF is num(s)/den(s) and each k is an element of gains array.
   */
  findRootLocus(tf: TransferFunctionExpression, gains: number[]) {
    const rlocusRoots = gains.map((gain) => {
      const coefficients = this.getClosedLoopCoefficients(tf, gain);
      const roots = this.calculateRoots(coefficients);
      return roots;
    });

    return rlocusRoots;
  }
}
