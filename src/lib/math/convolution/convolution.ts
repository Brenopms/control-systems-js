import { TransferFunctionExpression } from '../../transferFunction/transferFunction.entities';
import { IPolynomialOperations } from '../polynomialOperations/PolynomialOperations.entities';

import { IConvolution } from './convolution.entities';

export class Convolution implements IConvolution {
  constructor(private readonly polOps: IPolynomialOperations) {}

  execute(tf1: TransferFunctionExpression, tf2: TransferFunctionExpression): TransferFunctionExpression {
    const numerator = this.polOps.multiply(tf1.numerator, tf2.numerator);
    const denominator = this.polOps.multiply(tf1.denominator, tf2.denominator);
    return { numerator, denominator };
  }
}
