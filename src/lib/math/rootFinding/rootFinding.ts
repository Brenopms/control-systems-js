import { Complex } from 'mathjs';

export interface IRootFinding {
  findRoots(maxIterations: number, precision: number, tolerance: number): Complex[];
}
