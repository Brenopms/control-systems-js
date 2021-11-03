import {
  abs,
  Complex,
  complex,
  derivative,
  divide,
  EvalFunction,
  MathType,
  parse as parseExpression,
  sign,
  subtract,
} from 'mathjs';

import { EvalFunctions, FindRootOpts, INewtonRaphson } from './newtonRaphson.entities';

const DEFAULT_TOLERANCE = 10e-5;
const DEFAULT_PRECISION = 5;

export class NewtonRaphson implements INewtonRaphson {
  private readonly funExpression: string;
  private readonly functionOrder: number;

  constructor(funExpression: string, functionOrder: number) {
    this.funExpression = funExpression;
    this.functionOrder = functionOrder;
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

  private findRootGuesses({
    fn,
    fnOrder,
    variable,
    minValue,
    maxValue,
    step = 10e-3,
  }: {
    fn: EvalFunction;
    fnOrder: number;
    variable: string;
    minValue: number;
    maxValue: number;
    step?: number;
  }): number[] {
    const results = [];
    const crossZeroValues = [];
    let pointer = minValue;
    let index = 0;
    while (pointer < maxValue) {
      const result = fn.evaluate({ [variable]: pointer });
      results.push(result);
      pointer += step;

      if (index !== 0 && sign(result) !== sign(results[index - 1])) {
        crossZeroValues.push(pointer);
      }

      index += 1;
    }

    // TODO: expand search to find roots instead of throwing error
    if (crossZeroValues.length !== fnOrder) {
      throw new Error('Could not find all root guesses for given function');
    }

    return crossZeroValues;
  }

  findRoots(variable = 's', tolerance = DEFAULT_TOLERANCE): Complex[] {
    const { fun, derivativeFun } = this.getEvalFunctions(this.funExpression, variable);

    const rootGuesses = this.findRootGuesses({
      fn: fun,
      fnOrder: this.functionOrder,
      variable,
      minValue: -5,
      maxValue: 5,
    });

    const roots = rootGuesses?.map((guess) =>
      this.findRoot(fun, derivativeFun, { variable, initialValue: guess, tolerance })
    );

    const rootsWithPrecision = this.setRootsPrecision(roots, DEFAULT_PRECISION);
    return rootsWithPrecision;
  }
}
