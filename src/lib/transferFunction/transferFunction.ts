import { complex, Complex } from 'mathjs';

import { expressionToString } from '../helpers/expressionToString';
import { range } from '../helpers/range';
import { IRootFinding } from '../math/rootFinding/rootFinding';
import { IRootLocus } from '../rootLocus/rootLocus.entities';

import {
  ComplexNumber,
  ITransferFunction,
  TransferFunctionExpression,
  TransferFunctionInput,
} from './transferFunction.entities';

const MAX_ITERATIONS_ROOT = 100;
const PRECISION = 6;
const TOLERANCE = 10e-7;
const DEFAULT_GAINS = range(10);

export class TransferFunction implements Partial<ITransferFunction> {
  private readonly tf: TransferFunctionExpression;
  private readonly poles: Complex[];
  private readonly zeros: Complex[];

  private readonly rootFinder: IRootFinding;
  private readonly rootLocus: IRootLocus;

  constructor(
    transferFunctionInput: TransferFunctionInput,
    _timeDelay = 0,
    rootFinder: IRootFinding,
    rootLocus: IRootLocus
  ) {
    /**
     * Dependency injection
     */
    this.rootFinder = rootFinder;
    this.rootLocus = rootLocus;

    this.validateTransferFunctionInput(transferFunctionInput);
    this.tf = {
      numerator: this.complexNumberArrayToComplex(transferFunctionInput.numerator),
      denominator: this.complexNumberArrayToComplex(transferFunctionInput.denominator),
    };

    this.zeros = this.calculateRoots(this.tf.numerator);
    this.poles = this.calculateRoots(this.tf.denominator);
  }

  private validateTransferFunctionInput(input: TransferFunctionInput): void {
    if (!input || !input.numerator || !input.denominator) {
      throw new Error('Please input a valid transfer function');
    }

    if (input.numerator?.length > input.denominator?.length) {
      throw new Error(
        'The package only accepts transfer functions where the denominator is a higher order than the numerator'
      );
    }
  }

  private complexNumberToComplex(complexNumber: ComplexNumber): Complex {
    return complex(complexNumber.re, complexNumber.im);
  }

  private complexNumberArrayToComplex(complexArray: ComplexNumber[]): Complex[] {
    return complexArray.map((num) => this.complexNumberToComplex(num));
  }

  private calculateRoots = (coefficients: Complex[]) => {
    console.log(this.rootFinder);
    return this.rootFinder.findRoots(coefficients, MAX_ITERATIONS_ROOT, PRECISION, TOLERANCE);
  };

  toString(): string {
    const numeratorString = expressionToString(this.tf.numerator);
    const denominatorString = expressionToString(this.tf.denominator);
    return `(${numeratorString}) / (${denominatorString})`;
  }

  getExpression() {
    return this.tf;
  }

  pole() {
    return this.poles;
  }

  zero() {
    return this.zeros;
  }

  /**
   * Calculate the root locus by finding the roots of 1+k*TF(s) where TF is self.num(s)/self.den(s) and each k is an element of kvect.
   */
  rlocus2(k = DEFAULT_GAINS) {
    const rootLocusRoots = this.rootLocus.findRootLocus(this.tf, k);
    return rootLocusRoots;
  }
}

// https://wiki.octave.org/Control_package
