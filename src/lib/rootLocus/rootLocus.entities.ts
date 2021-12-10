import { Complex } from 'mathjs';

import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

export interface IRootLocus {
  findRootLocus(tf: TransferFunctionExpression, gains?: number[]): Complex[][];
}
