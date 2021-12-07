import { add, Complex, MathType, multiply, subtract } from 'mathjs';

import { range } from '../../../helpers/range';
import { IPolynomialOperations } from '../PolynomialOperations.entities';

/**
 * This is a naive implementation. The computational time is O(mn) for multiplication and division and O(n) for addition and subtraction
 * There are better algorithms for obtaining the result, especially for multiplication and division
 *
 *
 * "We'll use FFTs to do in O(n log n) time.
 * This is then used in Schonhage-Strassen integer multiplication algorithm that multiplies two n-bit integers in O(n log n loglog n) time.
 * We're only going to dopolynomial multiplication."
 *
 *
 * See [here](http://www.cs.cmu.edu/afs/cs/academic/class/15451-s10/www/lectures/lect0423.txt)
 * and [here](https://www.geeksforgeeks.org/strassens-matrix-multiplication/)
 * for more details
 *
 */
export class PolynomialOperations implements IPolynomialOperations {
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
        error: 'Invalid Polynomials type. They should be an array of umbers or complex numbers',
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

  add<T extends number | Complex>(pol1: T[], pol2: T[]): T[] {
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

  subtract<T extends number | Complex>(pol1: T[], pol2: T[]): T[] {
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

  multiply<T extends number | Complex>(pol1: T[], pol2: T[]): T[] {
    const { isValid, error } = this.checkPolynomials(pol1, pol2);
    if (!isValid) {
      throw new Error(error);
    }

    const polSize1 = pol1.length;
    const polSize2 = pol2.length;

    const orderedPol1 = this.reversePolynomial(pol1);
    const orderedPol2 = this.reversePolynomial(pol2);

    const newPolSize = polSize1 + polSize2 - 1;

    //Initializing result array with zeros
    const result: (number | Complex)[] = Array<number>(newPolSize).fill(0);

    for (const i of range(polSize1)) {
      for (const j of range(polSize2)) {
        result[i + j] = add(result[i + j], multiply(orderedPol1[i], orderedPol2[j])) as T;
      }
    }

    return this.reversePolynomial(result) as T[];
  }

  // TODO: implement division
  // https://en.wikipedia.org/wiki/Division_algorithm
  divide<T extends number | Complex>(_pol1: T[], _pol2: T[]): T[] {
    throw new Error('Not implemented!');
  }
}
