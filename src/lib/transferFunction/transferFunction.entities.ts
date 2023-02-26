import { Complex } from 'mathjs';

import { ChartData } from '../shared/charts/charts.entities';

export interface ComplexNumber {
  re: number;
  im: number;
}
export interface TransferFunctionInput {
  numerator: number[];
  denominator: number[];
}

export interface TransferFunctionExpression {
  numerator: Complex[];
  denominator: Complex[];
}

export interface ChartOptions {
  initialXValue: number;
  finalXValue: number;
  points: number;
}

export interface Axis {
  label: string;
  values: number[];
}

export interface ChartOutput {
  x: Axis;
  y: Axis;
}

export interface BodeChart {
  magnitude: ChartOutput;
  phase: ChartOutput;
}

export interface NyquistChart {
  points: ChartOutput;
  correspondingPoints: ChartOutput;
}

export interface RootLocusOutput {
  chartOutput: ChartData<number>;
  gains: number[];
}

/**
 * Transfer function interface.
 * 
 * @example
 * const tf = new TransferFunction({
 *  numerator: [{ re: 1, im: 1 }, { re: -2, im: 0 }],
 *  denominator: [{ re: 1, im: 0 }, { re: -2, im: 0 }, { re: -3, im: 0 }],
 * });
});
 */
export interface ITransferFunction {
  /****************************
   *
   * Model Attributes
   *
   ****************************/

  /**
   * Return the transfer function expression in a string format
   *
   * @example
   * const tf = new TransferFunction({
   *  numerator: [{ re: 1, im: 1 }, { re: -2, im: 0 }],
   *  denominator: [{ re: 1, im: 0 }, { re: -2, im: 0 }, { re: -3, im: 0 }],
   * });
   * console.log(tf.toString())
   * // Output: -(1 + i)s - 2 / s^2 - 2s - 3
   */
  toString(): string;

  /**
   * Returns the numerator and the denominator expression for a given
   * transfer function
   * @param options
   * @alias tfdata
   * @example
   * const tf = new TransferFunction({
   *  numerator: [{ re: 1, im: 1 }, { re: -2, im: 0 }],
   *  denominator: [{ re: 1, im: 0 }, { re: -2, im: 0 }, { re: -3, im: 0 }],
   * });
   * console.log(tf.getExpression())
   * // Output: { numerator: [-1, -2, 3], denominator: [1, -2] }
   */
  getExpression(): TransferFunctionExpression;

  /****************************
   *
   * Time-Domain Analysis
   *
   ****************************/

  /**
   * Calculates the unit impulse response of a dynamic system model.
   * The impulse response is the response to a Dirac input δ(t).
   * It returns a ready to input chart data, with x and y axis
   * @param options
   * @alias impulse
   */
  impulse(options?: ChartOptions): ChartOutput;

  /**
   * Calculates the step response of a dynamic system model.
   * It returns a ready to input chart data, with x and y axis
   * @alias impulse
   */
  step(options?: ChartOptions): ChartOutput;

  /****************************
   *
   * Frequency-Domain Analysis
   *
   ****************************/

  /**
   * Calculates the frequency response of a dynamic system.
   * Generates two objects, one for the magnitude in db
   * and the other for the phase in degrees of the system response as a function of frequency
   * @alias bode
   */
  bode(): BodeChart;

  /**
   * Given a frequency range, it calculates the real and
   * imaginary part of the transform function evaluated at each frequency
   * @alias nyquist
   */
  nyquist(): NyquistChart;

  /****************************
   *
   * Stability Analysis
   *
   ****************************/

  /**
   * Calculates the poles of a dynamic system model. Meaning, the values that will make the system
   * go to infinite.
   * The poles of a dynamic system determine the stability and response of the system.
   *
   * An open-loop linear time-invariant system is stable if:
   * In continuous-time, all the poles of the transfer function have negative real parts. When the poles are visualized on the complex s-plane, then they must all lie in the left-half plane (LHP) to ensure stability.
   * In discrete-time, all the poles must have a magnitude strictly smaller than one, that is they must all lie inside the unit circle.
   *
   * @alias pole
   */
  pole(): Complex[];

  /**
   * Calculates the zeros of a dynamic system model. Meaning, the values that will make the system
   * go to zero.
   *
   * @alias zero
   */
  zero(): Complex[];

  /****************************
   *
   * SISO Feedback Loops
   *
   ****************************/

  /**
   * Calculates and plots the root locus of the SISO model sys.
   * The root locus returns the closed-loop pole trajectories as a function of the feedback gain k (assuming negative feedback).
   * Root loci are used to study the effects of varying feedback gains on closed-loop pole locations.
   * In turn, these locations provide indirect information on the time and frequency responses.
   *
   * @param k Feedback gain
   * @alias rlocus
   */
  rlocus(k?: number[]): RootLocusOutput;
}
