import { Complex } from 'mathjs';

export interface IRootFinding {
  /**
   * Find roots from a given polynomial.
   * The polynomial should be passed during the class instantiation
   * @param maxIterations
   * @param precision
   * @param tolerance
   */
  findRoots(maxIterations: number, precision: number, tolerance: number): Complex[];
}
