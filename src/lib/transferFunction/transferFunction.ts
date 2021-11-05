import { complex, Complex } from 'mathjs';

import { DurandKerner } from '../math/rootFinding/implementations/durandKerner';

import { ComplexNumber, Expression, TransferFunctionInput } from './transferFunction.entities';

const MAX_ITERATIONS_ROOT = 100;
const PRECISION = 6;
const TOLERANCE = 10e-7;

export class TransferFunction {
  private readonly tf: Expression;
  private readonly poles: Complex[];
  private readonly zeros: Complex[];

  constructor(transferFunctionInput: TransferFunctionInput) {
    this.validateTransferFunctionInput(transferFunctionInput);
    this.tf = {
      numerator: transferFunctionInput[0].map((coefficient) => this.complexNumberToComplex(coefficient)),
      denominator: transferFunctionInput[1].map((coefficient) => this.complexNumberToComplex(coefficient)),
    };

    this.zeros = this.calculateRoots(this.tf.numerator);
    this.poles = this.calculateRoots(this.tf.denominator);
  }
  private validateTransferFunctionInput(input: TransferFunctionInput): void {
    if (!input || !input[0] || !input[1]) {
      throw new Error('Please input a valid transfer function');
    }

    if (input[0]?.length > input[0]?.length) {
      throw new Error(
        'The package only accepts transfer functions where the denominator is a higher order than the numerator'
      );
    }
  }

  private complexNumberToComplex(complexNumber: ComplexNumber): Complex {
    return complex(complexNumber.re, complexNumber.im);
  }

  private calculateRoots = (coefficients: Complex[]) => {
    return new DurandKerner(coefficients).findRoots(MAX_ITERATIONS_ROOT, PRECISION, TOLERANCE);
  };

  toString(): string {
    /*     const numeratorString = expressionToString(this.tf.numerator as);
    const denominatorString = expressionToString(this.tf.denominator);
    return `${numeratorString} / ${denominatorString}`; */
    return 'a';
  }

  pole() {
    return this.poles;
  }

  zero() {
    return this.zeros;
  }
}

// https://wiki.octave.org/Control_package
