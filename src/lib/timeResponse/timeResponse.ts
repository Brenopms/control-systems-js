import type { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { complex } from '../math/complex';
import type { IConvolution } from '../math/convolution/convolution.entities';
import type { IInverseLaplace } from '../math/inverseLaplace/inverseLaplace.entities';
import type { Point } from '../shared/charts/charts.entities';
import type { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import type { ITimeResponse } from './timeResponse.entities';

// step input signal = 1/s
const STEP_INPUT: TransferFunctionExpression = {
  numerator: [complex(1, 0)],
  denominator: [complex(1, 0), complex(0, 0)],
};

// impulse input signal = delta(t) = 1
const IMPULSE_INPUT: TransferFunctionExpression = {
  numerator: [complex(1, 0)],
  denominator: [complex(1, 0)],
};

/**
 * Calculates the time-domain response of a system to an input signal.
 */
export class TimeResponse implements ITimeResponse {
  constructor(
    private readonly calculateTransferFunction: ICalculateTransferFunction,
    private readonly inverseLaplace: IInverseLaplace,
    private readonly convolution: IConvolution,
  ) {}

  calculatePoints(
    tf: TransferFunctionExpression,
    input: TransferFunctionExpression,
    timeRange: number[],
  ): Point<number>[] {
    const responseFunction = this.convolution.execute(tf, input);

    return timeRange.map((time) => {
      const responseValue = this.inverseLaplace.execute(
        (s) => this.calculateTransferFunction.calculateValue(responseFunction, s),
        time,
      );
      return { x: time, y: responseValue };
    });
  }

  step(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[] {
    return this.calculatePoints(tf, STEP_INPUT, timeRange);
  }

  impulse(tf: TransferFunctionExpression, timeRange: number[]): Point<number>[] {
    return this.calculatePoints(tf, IMPULSE_INPUT, timeRange);
  }
}
