import { add, Complex, complex, divide, log, multiply, pow } from 'mathjs';

import { factorial } from '../../../helpers/factorial';
import { IInverseLaplace } from '../inverseLaplace.entities';

export class GaverStehfest implements IInverseLaplace {
  private readonly NUMBER_OF_COEFFICIENTS = 20;

  /**
   * Based on the implementations of the following links
   * https://github.com/jlapeyre/InverseLaplace.jl/blob/master/src/gaverstehfest.jl
   * https://www.cs.hs-rm.de/~weber/lapinv/gavsteh/gavsteh.htm
   * https://www.mathworks.com/matlabcentral/fileexchange/9987-gaver-stehfest-algorithm-for-inverse-laplace-transform
   * https://mpmath.org/doc/current/calculus/inverselaplace.html
   *
   * And the original research from Stehfest
   *
   * @param fn Laplace function to be transformed
   * @param t Time for the function to be evaluated at
   * @param L The number of coefficients. It depends on the computer word length used (examples: L=8, 10, 12, 14, 16, etc.)
   * @returns
   */
  private gavsteh(fn: (p: Complex) => Complex, t: number, L: number): Complex {
    const nn2 = L / 2;
    const v: Complex[] = [];

    for (let n = 1; n <= L; n++) {
      let z = complex(0, 0);
      for (let k = Math.floor((n + 1) / 2); k <= Math.min(n, nn2); k++) {
        const num = pow(k, nn2);
        const den = multiply(
          multiply(multiply(multiply(factorial(nn2 - k), factorial(k)), factorial(k - 1)), factorial(n - k)),
          factorial(2 * k - n)
        );
        const x = divide(multiply(num, factorial(2 * k)), den);
        z = add(z, x) as Complex;
      }
      v[n] = multiply(pow(-1, n + nn2), z) as Complex;
    }

    let sum = complex(0, 0);
    const ln2onT = divide(log(2.0), t);
    for (let n = 1; n <= L; n++) {
      const p = multiply(n, ln2onT);
      sum = add(sum, multiply(v[n], fn(complex(p, 0)))) as Complex;
    }
    return multiply(sum, ln2onT) as Complex;
  }

  /**
   * This function is an implementation of the Gaver-Stehfest method for numerical inverse Laplace transform.
   * The algorithm uses a summation of the function values evaluated at specific values,
   * multiplied by coefficients calculated using a combination of factorials and powers.
   * @param fn Laplace function to be transformed
   * @param time Time for the function to be evaluated at
   * @returns evaluated function value
   */
  execute(fn: (s: Complex) => Complex, time: number): number {
    return this.gavsteh(fn, time, this.NUMBER_OF_COEFFICIENTS)?.re;
  }
}
