import { abs, add, Complex, complex, divide, multiply, round, subtract } from 'mathjs';

const COMPLEX_ONE = complex(1, 0);

// Inspired by https://sites.google.com/site/drjohnbmatthews/polyroots/source
export class DurandKerner {
  /**
   * Monic form of passed coefficients
   */
  private readonly coefficients: Complex[];
  constructor(coefficients: Complex[]) {
    if (!coefficients) {
      throw new Error('Missing coefficients');
    }

    this.coefficients = this.toMonicForm(coefficients);
  }

  private toMonicForm = (coefficients: Complex[]) => {
    let monicCoefficients = [...coefficients];
    if (!coefficients[0].equals(COMPLEX_ONE)) {
      monicCoefficients = coefficients.map((coefficient) => divide(coefficient, this.coefficients[0]) as Complex);
    }

    return monicCoefficients;
  };

  private hasConverged(valuesA: Complex[], valuesB: Complex[], tolerance: number): boolean {
    for (const [index, a] of valuesA.entries()) {
      const b = valuesB[index];

      if (!a || !b) {
        return false;
      }

      const delta = subtract(a, b) as Complex;
      if (!(abs(delta.re) < tolerance) || !(abs(delta.im) < tolerance)) {
        return false;
      }
    }

    return true;
  }

  private evalPolynomial(coefficients: Complex[], value: Complex): Complex {
    // change to reduce
    let result = coefficients[0];
    for (let i = 1; i < coefficients.length; i++) {
      result = add(multiply(result, value), coefficients[i]) as Complex;
    }
    return result;
  }

  private generateInitialRootGuess(polynomialOrder: number, initialResult: Complex = complex(0.4, 0.9)): Complex[] {
    const initialGuess = [];
    initialGuess.push(COMPLEX_ONE);
    for (let i = 1; i < polynomialOrder - 1; i++) {
      initialGuess[i] = multiply(initialGuess[i - 1], initialResult) as Complex;
    }
    return initialGuess;
  }

  private calculateRoots(
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

        a1[i] = subtract(a0[i], divide(this.evalPolynomial(this.coefficients, a0[i]), result)) as Complex;
      }

      iterCount += 1;
      if (iterCount > maxIterations || this.hasConverged(a0, a1, tolerance)) {
        break;
      }

      a0 = [...a1];
    }
    return a1;
  }
  private setRootsPrecision(roots: Complex[], precision: number): Complex[] {
    return roots?.map((root) => complex(round(root.re, precision), round(root.im, precision)));
  }

  findRoots(maxIterations = 20 * Math.pow(this.coefficients?.length, 2), precision = 6, tolerance = 10e-6) {
    if (this.coefficients.length === 0) {
      return [];
    }

    const initialResult = complex(0.4, 0.9);
    const initialRoots: Complex[] = this.generateInitialRootGuess(this.coefficients.length, initialResult);
    const roots = this.calculateRoots(initialRoots, initialResult, maxIterations, tolerance);
    const rootsWithPrecision = this.setRootsPrecision(roots, precision);
    return rootsWithPrecision;
  }
}
