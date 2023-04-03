import { Complex } from '../math/complex';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

/**
 * The root locus returns the closed-loop pole trajectories as a function of the feedback gain k (assuming negative feedback).
 *
 * Root locus are used to study the effects of varying feedback gains on closed-loop pole locations. In turn, these locations provide indirect information on the time and frequency responses.
 */
export interface IRootLocus {
  findRootLocus(tf: TransferFunctionExpression, gains: number[]): Complex[][];
}
