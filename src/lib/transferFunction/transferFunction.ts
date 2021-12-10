import { complex, Complex } from 'mathjs';

import { expressionToString } from '../helpers/expressionToString';
import { range } from '../helpers/range';
import { PolynomialOperations } from '../math/polynomialOperations/implementations/PolynomialOperations';
import { DurandKerner } from '../math/rootFinding/implementations/durandKerner';

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
    return new DurandKerner().findRoots(coefficients, MAX_ITERATIONS_ROOT, PRECISION, TOLERANCE);
  };

  private getClosedLoopCoefficients(gain: number): Complex[] {
    const po = new PolynomialOperations();
    const complexGain = complex(gain, 0);
    const closedLoopCoefficients = po.add(po.multiply([complexGain], this.tf.numerator), this.tf.denominator);
    return closedLoopCoefficients;
  }

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
    const rlocusRoots = k.map((gain) => {
      const coefficients = this.getClosedLoopCoefficients(gain);
      const roots = this.calculateRoots(coefficients);
      return roots;
    });

    return rlocusRoots;
  }
}

// https://wiki.octave.org/Control_package
