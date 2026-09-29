import type { TransferFunctionExpression } from '../../transferFunction/transferFunction.entities';
import type { Complex } from '../complex';

/**
 * Evaluates a transfer function, given a complex value S
 */
export interface ICalculateTransferFunction {
  /**
   * Calculates the value of a transfer function expression given a complex s
   * @param transferFunction Transfer function expression
   * @param s Laplace transform variable value
   */
  calculateValue(transferFunction: TransferFunctionExpression, s: Complex): Complex;
}
