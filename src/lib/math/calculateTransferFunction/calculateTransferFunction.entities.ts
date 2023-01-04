import { Complex } from 'mathjs';

import { TransferFunctionExpression } from '../../transferFunction/transferFunction.entities';

export interface ICalculateTransferFunction {
  calculateValue(transferFunction: TransferFunctionExpression, s: Complex): Complex;
}
