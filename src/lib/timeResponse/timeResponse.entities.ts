import type { Point } from '../shared/charts/charts.entities';
import type { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

/**
 * Calculates the time-domain response of a system to an input signal,
 * returning an array of calculated points.
 */
export interface ITimeResponse {
  /**
   * Calculates the response of a transfer function to a given input signal,
   * returning an array of calculated points
   * @param tf transfer function to be evaluated
   * @param input Laplace-domain expression of the input signal driven into the system
   * @param timeRange Array of times to calculate the response value
   */
  calculatePoints(
    tf: TransferFunctionExpression,
    input: TransferFunctionExpression,
    timeRange: number[],
  ): Point<number>[];

  /**
   * Calculates the step response of a transfer function, returning an array of calculated points
   * @param tf transfer function to be evaluated
   * @param timeRange Array of times to calculate the step response value
   */
  step(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[];

  /**
   * Calculates the impulse response of a transfer function, returning an array of calculated points
   * @param tf transfer function to be evaluated
   * @param timeRange Array of times to calculate the impulse response value
   */
  impulse(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[];
}
