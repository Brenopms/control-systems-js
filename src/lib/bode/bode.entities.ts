import { Point } from '../shared/charts/charts.entities';
import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

export interface BodeOutput {
  phase: Point<number>[];
  magnitude: Point<number>[];
}

export interface IBode {
  calculatePoints(transferFunction: TransferFunctionExpression, frequencyRange: number[]): BodeOutput;
}
