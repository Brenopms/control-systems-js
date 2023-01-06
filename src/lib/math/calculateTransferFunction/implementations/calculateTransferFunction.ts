import { add, Complex, complex, divide, multiply, pow } from 'mathjs';

import { TransferFunctionExpression } from '../../../transferFunction/transferFunction.entities';
import { ICalculateTransferFunction } from '../calculateTransferFunction.entities';

export class CalculateTransferFunction implements ICalculateTransferFunction {
  private evaluateExpressionValue(value: Complex, coeff: Complex, numOfCoeffs: number, currentIndex: number): Complex {
    // numOfCoeffs - currentIndex - 1 is used to evaluate correctly the power of the variable, since
    // the in the array of the coefficients, the first value is the highest power
    return multiply(coeff, pow(value, numOfCoeffs - currentIndex - 1)) as Complex;
  }

  calculateValue(tf: TransferFunctionExpression, s: Complex): Complex {
    // Evaluate the polynomials formed by the numerator and denominator coefficients at s
    const numerator = tf.numerator.reduce(
      (acc: Complex, coeff: Complex, index) =>
        add(acc, this.evaluateExpressionValue(s, coeff, tf.numerator.length, index)) as Complex,
      complex(0, 0)
    );
    const denominator = tf.denominator.reduce(
      (acc: Complex, coeff: Complex, index) =>
        add(acc, this.evaluateExpressionValue(s, coeff, tf.denominator.length, index)) as Complex,
      complex(0, 0)
    );

    return divide(numerator, denominator) as Complex;
  }

  /*   calculateValue2(tf: TransferFunctionExpression, s: Complex): Complex {
    let numeratorResult = complex(0, 0);
    let denominatorResult = complex(0, 0);

    tf.numerator.forEach((coeff, index) => {
      numeratorResult = add(numeratorResult, multiply(coeff, pow(s, tf.numerator.length - 1 - index))) as Complex;
    });

    tf.denominator.forEach((coeff, index) => {
      denominatorResult = add(denominatorResult, multiply(coeff, pow(s, tf.denominator.length - 1 - index))) as Complex;
    });

    return divide(numeratorResult, denominatorResult) as Complex;
  } */
}
