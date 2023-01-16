import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

/**
 * Nyquist points and corresponding points in the complex plane
 * The x is the real part and y represents the imaginary value of each result
 */
export interface NyquistOutput {
  /**
   * Each evaluated point of the transfer function for the frequency range given
   * The x is the real part and y represents the imaginary value of each result
   */
  points: Point<number>[];

  /**
   * x-axis reflected calculated points
   */
  correspondingPoints: Point<number>[];
}

export interface INyquist {
  /**
   * Given a transform function and a frequency range, calculates the real and
   * imaginary part of the transform function evaluated at each frequency
   * @param transferFunction Transfer Function expressions to be plotted
   * @param frequencyRange Array of frequencies to be calculated
   */
  calculatePoints(transferFunction: TransferFunctionExpression, frequencyRange: number[]): NyquistOutput;
}
