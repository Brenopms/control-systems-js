import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { complex } from '../math/complex';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { INyquist, NyquistOutput } from './nyquist.entities';

export class Nyquist implements INyquist {
  constructor(private calculateTransferFunction: ICalculateTransferFunction) {}

  calculatePoints(tf: TransferFunctionExpression, frequencyRange: number[]): NyquistOutput {
    const points: NyquistOutput['points'] = [];
    const correspondingPoints: NyquistOutput['correspondingPoints'] = [];

    for (const f of frequencyRange) {
      // Calculate the transfer function at the given frequency
      const s = complex(0, f);
      const calculatedTf = this.calculateTransferFunction.calculateValue(tf, s);

      // Add the real and imaginary parts of the transfer function to the data array
      points.push({ x: calculatedTf?.re, y: calculatedTf?.im });
      correspondingPoints.push({ x: calculatedTf?.re, y: -calculatedTf?.im });
    }

    return {
      points,
      correspondingPoints,
    };
  }
}
