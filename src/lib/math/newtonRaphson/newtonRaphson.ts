import {
  abs,
  Complex,
  complex,
  derivative,
  divide,
  EvalFunction,
  MathType,
  parse as parseExpression,
  subtract,
} from 'mathjs';

import { EvalFunctions, FindRootOpts, INewtonRaphson } from './newtonRaphson.entities';

const DEFAULT_TOLERANCE = 10e-5;
const DEFAULT_PRECISION = 5;

export class NewtonRaphson implements INewtonRaphson {
  private readonly funExpression: string;
  constructor(funExpression: string) {
    this.funExpression = funExpression;
  }

  private getEvalFunctions(expression: string, variable: string): EvalFunctions {
    const fun = parseExpression(expression).compile();
    const derivativeFun = derivative(expression, variable).compile();
    return { fun, derivativeFun };
  }

  private evaluateFunction(fun: EvalFunction, value: MathType, variable: string): Complex {
    return complex(fun.evaluate({ [variable]: value }));
  }

  private findRoot(fn: EvalFunction, dFn: EvalFunction, opts: FindRootOpts): Complex {
    let [funResult, derivativeResult] = [
      this.evaluateFunction(fn, opts.initialValue, opts.variable),
      this.evaluateFunction(dFn, opts.initialValue, opts.variable),
    ];

    const initialH = divide(funResult, derivativeResult);
    let h = initialH;
    let x0 = opts.initialValue as Complex;
    console.log({ funResult, derivativeResult, initialH, x0 });
    while (abs(h as number) > opts.tolerance) {
      [funResult, derivativeResult] = [
        this.evaluateFunction(fn, x0, opts.variable),
        this.evaluateFunction(dFn, x0, opts.variable),
      ];

      h = divide(funResult, derivativeResult);
      x0 = subtract(x0, h) as Complex;
    }
    return x0;
  }

  private setRootsPrecision(roots: Complex[], precision: number): Complex[] {
    return roots?.map((root) => complex(root.format(precision)));
  }

  findRoots(variable = 's', tolerance = DEFAULT_TOLERANCE): Complex[] {
    const { fun, derivativeFun } = this.getEvalFunctions(this.funExpression, variable);
    const initialValue = -5;

    const roots = this.findRoot(fun, derivativeFun, { variable, initialValue, tolerance });
    const rootsWithPrecision = this.setRootsPrecision([roots], DEFAULT_PRECISION);
    return rootsWithPrecision;
  }
}
