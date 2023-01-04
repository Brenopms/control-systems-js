import { add, arg, Complex, complex, pow, sqrt } from 'mathjs';

import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { BodeOutput, IBode, Point } from './bode.entities';

export class Bode implements IBode {
  constructor(private calculateTransferFunction: ICalculateTransferFunction) {}

  private calculateAbsoluteValue(value: Complex): number {
    const sumOfQuadratic = add(pow(value.re, 2), pow(value.im, 2)) as number;
    const result = sqrt(sumOfQuadratic);
    return result;
  }

  calculatePoints(tf: TransferFunctionExpression, frequencyRange: number[]): BodeOutput {
    const magnitudeData: Point[] = [];
    const phaseData: Point[] = [];

    for (const f of frequencyRange) {
      // Calculate the transfer function at the given frequency
      const s = complex(0, 2 * Math.PI * f);
      const calculatedTf = this.calculateTransferFunction.calculateValue(tf, s);

      // Calculate the magnitude and phase of the transfer function
      const magnitude = 20 * Math.log10(this.calculateAbsoluteValue(calculatedTf));
      const phase = (arg(calculatedTf) * 180) / Math.PI;

      // Add the magnitude and phase data to the appropriate arrays
      magnitudeData.push({ x: f, y: magnitude });
      phaseData.push({ x: f, y: phase });
    }

    return {
      magnitude: magnitudeData,
      phase: phaseData,
    };
  }
}
