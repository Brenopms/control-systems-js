import { Complex } from 'mathjs';

export type NumberOrComplexArray = number[] | Complex[];

export interface IPolynomialOperations {
  /**
   * Add two polynomials
   * @param pol1
   * @param pol2
   */
  add<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[];

  /**
   * Subtract two polynomials
   * @param pol1
   * @param pol2
   */
  subtract<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[];

  /**
   * Divide two polynomials
   * @param pol1
   * @param pol2
   */
  divide<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[];

  /**
   * Multiply two polynomials
   * @param pol1
   * @param pol2
   */
  multiply<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[];
}
