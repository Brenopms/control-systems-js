import { clone } from 'mathjs';

import { IStability } from '../stability.entities';

/**
 * Routh-Hurwitz Stability Criterion algorithm implementation.
 * Details of the theory and implementation can be seen [here](https://en.wikipedia.org/wiki/Routh%E2%80%93Hurwitz_stability_criterion)
 *
 * Implementation based on "Muchen He" code, which can be seen [here](https://github.com/FSXAC/RHCalc)
 */
export class RouthHurwitzStability implements IStability {
  private initializeRHTable(coefficients: number[]): number[][] {
    const cols = Math.ceil(coefficients.length / 2);
    const rows = coefficients.length;

    // Initialize empty RH matrix
    const mat: number[][] = [];
    for (let j = 0; j < rows; j++) {
      mat[j] = [];
      for (let c = 0; c < cols; c++) {
        mat[j][c] = 0;
      }
    }

    // Fill the coefficients
    for (let i = 0; i < coefficients.length; i++) {
      const row = i % 2;
      const col = Math.floor(i / 2);
      mat[row][col] = coefficients[i];
    }

    return mat;
  }

  private eliminateNaNs(nums: number[]) {
    return nums.map((num) => (Number.isNaN(num) ? 0 : num));
  }

  private determinant(arr: number[]) {
    if (arr.length < 4) {
      throw new Error('Number of coefficients to calculate the determinant is invalid');
    }

    const det = arr[0] * arr[3] - arr[1] * arr[2];

    return det;
  }

  private computeRHTable(matrix: number[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const computedMatrix = clone(matrix);

    // for each of the remaining rows
    for (let i = 2; i < rows; i++) {
      let divider = computedMatrix[i - 1][0];

      // if the 'b' value is 0, then set it to a small number
      if (divider == 0) {
        divider = 1e-10;
      }

      const head1 = computedMatrix[i - 2][0];
      const head2 = computedMatrix[i - 1][0];
      // we don't need to do the first two rows
      // for the row 3-4, we do -1 of the total columns
      for (let j = 0; j < cols; j++) {
        let tail1 = computedMatrix[i - 2][j + 1];
        let tail2 = computedMatrix[i - 1][j + 1];

        if (tail1 === undefined) {
          tail1 = 0;
        }
        if (tail2 === undefined) {
          tail2 = 0;
        }

        const m = (-1 / divider) * this.determinant(this.eliminateNaNs([head1, tail1, head2, tail2]));

        computedMatrix[i][j] = m;
      }
    }
    return computedMatrix;
  }

  public isStable(coefficients: number[]): boolean {
    // If all coefficients are 0 the expression is not stable
    if (coefficients?.every((coeff) => coeff === 0)) {
      return false;
    }

    const rhTable = this.initializeRHTable(coefficients);
    const stabilityMatrix = this.computeRHTable(rhTable);

    for (let i = 0; i < stabilityMatrix.length; i++) {
      if (stabilityMatrix[i][0] < 0) {
        return false;
      }
    }

    return true;
  }
}
