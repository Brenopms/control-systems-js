import { add, MathType, subtract } from 'mathjs';

import { range } from '../../../helpers/range';
import { IPolynomialOperations, NumberOrComplexArray } from '../PolynomialOperations.entities';

export class PolynomialOperations implements Partial<IPolynomialOperations> {
  /**
   * Validates polynomials arrays
   * @param pol1
   * @param pol2
   */
  private checkPolynomials<T>(pol1: T[], pol2: T[]): { isValid: boolean; error?: string } {
    if (!pol1 || !pol2) {
      return {
        isValid: false,
        error: 'Missing Polynomials',
      };
    }

    if (!Array.isArray(pol1) || !Array.isArray(pol2)) {
      return {
        isValid: false,
        error: 'Invalid Polynomials type. They should be an array of numbers or complex numbers',
      };
    }

    return { isValid: true };
  }

  /**
   * Reversed polynomial order to have the smaller order as the first item of the array
   * @param pol1
   * @param pol2
   */
  private reversePolynomial<T>(pol: T[]): T[] {
    const orderedPol = [...pol].reverse();
    return orderedPol;
  }

  /**
   * Get the highest polynomial order between two polynomials
   * @param pol1
   * @param pol2
   */
  private getHighestPolynomialOrder<T>(pol1: T[], pol2: T[]): number {
    const highestOrder = Math.max(pol1.length, pol2.length);
    return highestOrder;
  }

  add<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[] {
    const { isValid, error } = this.checkPolynomials(pol1, pol2);
    if (!isValid) {
      throw new Error(error);
    }

    const [orderedPol1, orderedPol2] = [this.reversePolynomial(pol1), this.reversePolynomial(pol2)];
    const polynomialHighestOrder = this.getHighestPolynomialOrder(pol1, pol2);

    const resultPolynomial = [];
    for (const index of range(polynomialHighestOrder)) {
      const coefficient = add((orderedPol1[index] as MathType) || 0, (orderedPol2[index] as MathType) || 0) as T;
      resultPolynomial.push(coefficient);
    }

    return this.reversePolynomial(resultPolynomial);
  }

  subtract<T extends NumberOrComplexArray>(pol1: T[], pol2: T[]): T[] {
    const { isValid, error } = this.checkPolynomials(pol1, pol2);
    if (!isValid) {
      throw new Error(error);
    }

    const [orderedPol1, orderedPol2] = [this.reversePolynomial(pol1), this.reversePolynomial(pol2)];
    const polynomialHighestOrder = this.getHighestPolynomialOrder(pol1, pol2);

    const resultPolynomial = [];
    for (const index of range(polynomialHighestOrder)) {
      const coefficient = subtract((orderedPol1[index] as MathType) || 0, (orderedPol2[index] as MathType) || 0) as T;
      resultPolynomial.push(coefficient);
    }

    return this.reversePolynomial(resultPolynomial);
  }
}
