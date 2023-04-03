import { Complex } from '../complex';

export interface IPolynomialOperations {
  /**
   * Add two polynomials
   * @param pol1
   * @param pol2
   */
  add<T extends Complex>(pol1: T[], pol2: T[]): T[];

  /**
   * Subtract two polynomials
   * @param pol1
   * @param pol2
   */
  subtract<T extends Complex>(pol1: T[], pol2: T[]): T[];

  /**
   * Divide two polynomials
   * @param pol1
   * @param pol2
   */
  divide<T extends Complex>(pol1: T[], pol2: T[]): T[];

  /**
   * Multiply two polynomials
   * @param pol1
   * @param pol2
   */
  multiply<T extends Complex>(pol1: T[], pol2: T[]): T[];
}
