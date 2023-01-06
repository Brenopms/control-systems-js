import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

/**
 * Set of points for phase and magnitude of a Bode plot
 */
export interface BodeOutput {
  phase: Point<number>[];
  magnitude: Point<number>[];
}

/**
 * Class for calculating Bode plot points
 */
export interface IBode {
  /**
   * Given a transform function and a frequency range, calculates the magnitude
   * and phase of the passed tf for each frequency
   * @param transferFunction Transfer Function expressions to be plotted
   * @param frequencyRange Array of frequencies to be used as x-axis
   */
  calculatePoints(transferFunction: TransferFunctionExpression, frequencyRange: number[]): BodeOutput;
}
