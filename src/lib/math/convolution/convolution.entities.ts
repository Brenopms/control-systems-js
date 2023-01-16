import { TransferFunctionExpression } from '../../transferFunction/transferFunction.entities';

export interface IConvolution {
  /**
   * Executes the convolution of two transfer functions
   * @param tf1 - The first transfer function
   * @param tf2 - The second transfer function
   * @returns The convolved transfer function
   */
  execute(tf1: TransferFunctionExpression, tf2: TransferFunctionExpression): TransferFunctionExpression;
}
