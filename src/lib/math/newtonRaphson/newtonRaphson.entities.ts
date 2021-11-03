import { Complex, EvalFunction, MathType } from 'mathjs';

export interface INewtonRaphson {
  findRoots(variable: string, tolerance: number): Complex[];
}

export interface EvalFunctions {
  fun: EvalFunction;
  derivativeFun: EvalFunction;
}

export interface FindRootOpts {
  variable: string;
  initialValue: MathType;
  tolerance: number;
}
