import { abs, add, Complex, complex, divide, multiply, subtract } from 'mathjs';

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

  private hasConverged(valuesA: Complex[], valuesB: Complex[], tolerance: number) {
    for (const [index, a] of valuesA.entries()) {
      const b = valuesB[index];
      if (!a || !b) {
        return false;
      }

      const delta = subtract(a, b) as Complex;
      //console.log({ a, b, delta });
      if (!(abs(delta.re) < tolerance) || !(abs(delta.im) < tolerance)) {
        return false;
      }
    }
    return true;
  }

  private evalPolynomial(coefficients: Complex[], value: Complex) {
    // change to reduce
    let result = coefficients[0];
    for (let i = 1; i < coefficients.length; i++) {
      result = add(multiply(result, value), coefficients[i]) as Complex;
    }
    return result;
  }

  private generateInitialGuess(polynomialOrder: number, initialResult: Complex = complex(0.4, 0.9)) {
    const initialGuess = [];
    initialGuess.push(COMPLEX_ONE);
    for (let i = 1; i < polynomialOrder - 1; i++) {
      initialGuess[i] = multiply(initialGuess[i - 1], initialResult) as Complex;
    }
    return initialGuess;
  }

  findRoots(maxIterations = 20 * Math.pow(this.coefficients?.length, 2), tolerance = 10e-6) {
    if (this.coefficients.length === 0) {
      return [];
    }

    let result = complex(0.4, 0.9);
    let a0: Complex[] = this.generateInitialGuess(this.coefficients.length, result);
    const a1: Complex[] = [];

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
}

/* Iterations: 1
a0: 
1.0 + 0.0i
0.4 + 0.9i
a1: 
1.0 + 0.0i
2.0 - 2.220446049250313E-16i */
