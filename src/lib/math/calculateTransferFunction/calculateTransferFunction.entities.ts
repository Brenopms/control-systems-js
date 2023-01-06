import { Complex } from 'mathjs';

import { TransferFunctionExpression } from '../../transferFunction/transferFunction.entities';

/**
 * Evaluates a transfer function, given a complex value S
 */
export interface ICalculateTransferFunction {
  /**
   * Calculates the value of a transfer function expression given a complex s
   * @param tf Transfer function expression
   * @param s Laplace transform variable value
   */
  calculateValue(transferFunction: TransferFunctionExpression, s: Complex): Complex;
}
