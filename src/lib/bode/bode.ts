import { add, arg, Complex, complex, pow, sqrt } from 'mathjs';

import { ICalculateTransferFunction } from '../math/calculateTransferFunction/calculateTransferFunction.entities';
import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

import { BodeOutput, IBode } from './bode.entities';

export class Bode implements IBode {
  constructor(private calculateTransferFunction: ICalculateTransferFunction) {}

  private calculateAbsoluteValue(value: Complex): number {
    const sumOfQuadratic = add(pow(Math.abs(value.re), 2), pow(Math.abs(value.im), 2)) as number;
    const result = sqrt(sumOfQuadratic);
    return result;
  }

  calculatePoints(tf: TransferFunctionExpression, frequencyRange: number[]): BodeOutput {
    const magnitudeData: Point<number>[] = [];
    const phaseData: Point<number>[] = [];

    for (const f of frequencyRange) {
      // Calculate the transfer function at the given frequency
      const s = complex(0, f);
      const calculatedTf = this.calculateTransferFunction.calculateValue(tf, s);

      // Calculate the magnitude and phase of the transfer function
      const magnitude = 20 * Math.log10(this.calculateAbsoluteValue(calculatedTf));
      const phase = (arg(calculatedTf) * 180) / Math.PI;

      magnitudeData.push({ x: f, y: magnitude });
      phaseData.push({ x: f, y: phase });
    }

    return {
      magnitude: magnitudeData,
      phase: phaseData,
    };
  }
}
