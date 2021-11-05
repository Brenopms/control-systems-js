import { complex, Complex } from 'mathjs';

import { expressionToString } from '../helpers/expressionToString';
import { DurandKerner } from '../math/rootFinding/implementations/durandKerner';

import { ComplexNumber, Expression, ITransferFunction, TransferFunctionInput } from './transferFunction.entities';

const MAX_ITERATIONS_ROOT = 100;
const PRECISION = 6;
const TOLERANCE = 10e-7;

export class TransferFunction implements Partial<ITransferFunction> {
  private readonly tf: Expression;
  private readonly poles: Complex[];
  private readonly zeros: Complex[];

  constructor(transferFunctionInput: TransferFunctionInput, _timeDelay = 0) {
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
    return new DurandKerner(coefficients).findRoots(MAX_ITERATIONS_ROOT, PRECISION, TOLERANCE);
  };

  toString(): string {
    const numeratorString = expressionToString(this.tf.numerator);
    const denominatorString = expressionToString(this.tf.denominator);
    return `${numeratorString} / ${denominatorString}`;
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
}

// https://wiki.octave.org/Control_package
