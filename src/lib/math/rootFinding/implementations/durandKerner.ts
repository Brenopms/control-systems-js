import { abs, add, Complex, complex, divide, multiply, subtract } from '../../complex';
import { IRootFinding } from '../rootFinding';

const COMPLEX_ONE = complex(1, 0);

/**
 * Implementation of a root finding algorithm.
 * Based on Dr. John B. Matthews's [Java implementation](https://sites.google.com/site/drjohnbmatthews/polyroots/source)
 */
export class DurandKerner implements IRootFinding {
  /**
   * Transform polynomial coefficients to comply to a monic form
   * @param coefficients
   */
  private toMonicForm = (coefficients: Complex[]) => {
    let monicCoefficients = [...coefficients];
    if (coefficients[0] && !(coefficients[0]?.re === 1 && coefficients[0]?.im === 0)) {
      monicCoefficients = coefficients.map((coefficient) => divide(coefficient, coefficients[0]) as Complex);
    }

    return monicCoefficients;
  };

  /**
   * Check if the arrays have converged, meaning that the delta for each value inside both arrays
   * are less than the tolerance passed
   * @param valuesA
   * @param valuesB
   * @param tolerance
   */
  private hasConverged(valuesA: Complex[], valuesB: Complex[], tolerance: number): boolean {
    for (const [index, a] of valuesA.entries()) {
      const b = valuesB[index];

      // Check if difference between both values are within the tolerance
      const delta = subtract(a, b) as Complex;
      if (!(abs(delta.re) < tolerance) || !(abs(delta.im) < tolerance)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Evaluates polynomial according to a given value.
   * It uses the [Horner's method](https://en.wikipedia.org/wiki/Horner%27s_method) for evaluation
   * @param coefficients
   * @param value
   */
  private evalPolynomial(coefficients: Complex[], value: Complex): Complex {
    // Slice(1) to start from index 1 the reduce function
    const result: Complex = coefficients.slice(1).reduce((prev, curr) => {
      return add(multiply(prev, value), curr) as Complex;
    }, coefficients[0]);

    return result;
  }

  /**
   * Creates an array with the initial root guesses
   * @param polynomialOrder
   * @param initialResult
   */
  private generateInitialRootGuess(polynomialOrder: number, initialResult: Complex): Complex[] {
    const initialGuess = [];
    initialGuess.push(COMPLEX_ONE);
    for (let i = 1; i < polynomialOrder - 1; i++) {
      initialGuess[i] = multiply(initialGuess[i - 1], initialResult) as Complex;
    }
    return initialGuess;
  }

  /**
   * Calculates the roots of a polynomial
   * @param initialRoots
   * @param initialResult
   * @param maxIterations
   * @param tolerance
   */
  private calculateRoots(
    coefficients: Complex[],
    initialRoots: Complex[],
    initialResult: Complex,
    maxIterations: number,
    tolerance: number
  ): Complex[] {
    let a0 = [...initialRoots];
    const a1 = [];

    let result = initialResult;
    let iterCount = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      for (let i = 0; i < a0.length; i++) {
        result = COMPLEX_ONE;
        for (let j = 0; j < a0.length; j++) {
          if (i !== j) {
            result = multiply(subtract(a0[i], a0[j]), result) as Complex;
          }
        }

        // fixed point iteration
        // x_(n+1) = x_n - f(x_n)/(x_n - q)(x_n-r)(x_n - p)...
        a1[i] = subtract(a0[i], divide(this.evalPolynomial(coefficients, a0[i]), result)) as Complex;
      }

      iterCount += 1;

      if (iterCount > maxIterations) {
        throw new Error(
          'Could not calculate the roots for the given function, please try to increase the max iterations allowed'
        );
      }

      if (this.hasConverged(a0, a1, tolerance)) {
        break;
      }

      a0 = [...a1];
    }
    return a1;
  }

  /**
   * Applies the precision to each calculated root
   * @param roots
   * @param precision
   */
  private setRootsPrecision(roots: Complex[], precision: number): Complex[] {
    return roots.map((root) => complex(Number(root.re.toPrecision(precision)), Number(root.im.toPrecision(precision))));
  }

  /**
   * Find all the roots from a polynomial. It applies the Durand–Kerner (or Weierstrass) method.
   * The array should have the highest order coefficient first.
   * @param maxIterations
   * @param precision
   * @param tolerance
   */
  findRoots(
    coefficients: Complex[],
    maxIterations = 20 * Math.pow(coefficients.length, 2),
    precision = 6,
    tolerance = 10e-6
  ) {
    if (!coefficients || !Array.isArray(coefficients)) {
      throw new Error('Missing or invalid coefficients');
    }

    if (coefficients.length === 0 || coefficients.length === 1) {
      return [];
    }

    const monicCoefficients = (coefficients = this.toMonicForm(coefficients));

    const initialResult = complex(0.4, 0.9);
    const initialRoots: Complex[] = this.generateInitialRootGuess(monicCoefficients.length, initialResult);
    const roots = this.calculateRoots(monicCoefficients, initialRoots, initialResult, maxIterations, tolerance);
    const rootsWithPrecision = this.setRootsPrecision(roots, precision);
    return rootsWithPrecision;
  }
}
