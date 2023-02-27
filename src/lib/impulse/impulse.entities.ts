import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

export interface IImpulse {
  /**
   * Calculates the impulse response of a transfer function, returning an array of calculated points
   * @param tf transfer function to be evaluated
   * @param timeRange Array of times to calculate the step response value
   */
  calculatePoints(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[];
}
