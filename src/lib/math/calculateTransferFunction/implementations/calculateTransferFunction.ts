import { add, Complex, complex, divide, multiply, pow } from 'mathjs';

import { TransferFunctionExpression } from '../../../transferFunction/transferFunction.entities';
import { ICalculateTransferFunction } from '../calculateTransferFunction.entities';

export class CalculateTransferFunction implements ICalculateTransferFunction {
  calculateValue(tf: TransferFunctionExpression, s: Complex): Complex {
    // Evaluate the polynomials formed by the numerator and denominator coefficients at s
    const numerator = tf.numerator.reduce(
      (acc: Complex, coeff: Complex, index: number) => add(acc, multiply(coeff, pow(s, index))) as Complex,
      complex(0, 0)
    );
    const denominator = tf.denominator.reduce(
      (acc: Complex, coeff: Complex, index: number) => add(acc, multiply(coeff, pow(s, index))) as Complex,
      complex(0, 0)
    );

    return divide(numerator, denominator) as Complex;
  }
}
