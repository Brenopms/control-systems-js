import { complex } from 'mathjs';

import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { IConvolution } from '../math/convolution/convolution.entities';
import { IInverseLaplace } from '../math/inverseLaplace/inverseLaplace.entities';
import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { IStep } from './step.entities';

export class Step implements IStep {
  constructor(
    private readonly calculateTransferFunction: ICalculateTransferFunction,
    private readonly inverseLaplace: IInverseLaplace,
    private readonly convolution: IConvolution
  ) {}

  calculatePoints(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[] {
    // step = 1/s
    const stepExpression: TransferFunctionExpression = {
      numerator: [complex(1, 0)],
      denominator: [complex(1, 0), complex(0, 0)],
    };

    // step response = tf * 1/s
    const responseFunction = this.convolution.execute(tf, stepExpression);

    console.log(responseFunction);

    const points: Point<number>[] = timeRange.map((time) => {
      const timeResponse = this.inverseLaplace.execute(
        (s) => this.calculateTransferFunction.calculateValue(responseFunction, s),
        time
      );
      return { x: time, y: timeResponse };
    });

    return points;
  }
}
