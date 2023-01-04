import { TransferFunctionExpression } from '../transferFunction/transferFunction.entities';

// TODO: move to chart entities
export interface Point {
  x: number;
  y: number;
}

export interface BodeOutput {
  phase: Point[];
  magnitude: Point[];
}

export interface IBode {
  calculatePoints(transferFunction: TransferFunctionExpression, frequencyRange: number[]): BodeOutput;
}
