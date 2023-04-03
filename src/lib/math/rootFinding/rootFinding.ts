import { Complex } from '../complex';

export interface IRootFinding {
  /**
   * Find roots from a given polynomial.
   * The polynomial should be passed during the class instantiation
   * @param maxIterations
   * @param precision
   * @param tolerance
   */
  findRoots(coefficients: Complex[], maxIterations?: number, precision?: number, tolerance?: number): Complex[];
}
