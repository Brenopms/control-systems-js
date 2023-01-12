import { Complex } from 'mathjs';

/**
 * Applies inverse laplace of a function and evaluates it given a passed time
 */
export interface IInverseLaplace {
  /**
   * Executes Inverse Laplace transformation and evaluates it given the time argument
   * @param fn Laplace function that accepts s as an argument and evaluates it
   * @param time time to evaluate the function
   */
  execute(fn: (s: Complex) => Complex, time: number): number;
}
