import type { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { complex } from '../math/complex';
import type { IConvolution } from '../math/convolution/convolution.entities';
import type { IInverseLaplace } from '../math/inverseLaplace/inverseLaplace.entities';
import type { Point } from '../shared/charts/charts.entities';
import type { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import type { IImpulse } from './impulse.entities';

export class Impulse implements IImpulse {
  constructor(
    private readonly calculateTransferFunction: ICalculateTransferFunction,
    private readonly inverseLaplace: IInverseLaplace,
    private readonly convolution: IConvolution,
  ) {}

  calculatePoints(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[] {
    // impulse = delta(t)
    const impulseExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(1, 0)],
    };

    // impulse response = tf * delta(t)
    const responseFunction = this.convolution.execute(tf, impulseExpression);

    const points: Point<number>[] = timeRange.map((time) => {
      const timeResponse = this.inverseLaplace.execute(
        (s) => this.calculateTransferFunction.calculateValue(responseFunction, s),
        time,
      );
      return { x: time, y: timeResponse };
    });

    return points;
  }
}
