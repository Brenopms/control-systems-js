import { expressionToString } from '../helpers/expressionToString';

import { Expression, TransferFunctionInput } from './transferFunction.entities';

export class TransferFunction {
  private readonly tf: Expression;

  constructor(transferFunctionInput: TransferFunctionInput) {
    this.validateTransferFunctionInput(transferFunctionInput);
    this.tf = {
      numerator: transferFunctionInput[0],
      denominator: transferFunctionInput[1],
    };
  }

  private validateTransferFunctionInput(input: TransferFunctionInput): void {
    if (!input || !input[0] || !input[1]) {
      throw new Error('Please input a valid transfer function');
    }

    if (input[1]?.length > input[0]?.length) {
      throw new Error('The package only accepts transfer functions where the denominator is not a higher order');
    }
  }

  public toString(): string {
    const numeratorString = expressionToString(this.tf.numerator);
    const denominatorString = expressionToString(this.tf.denominator);
    return `${numeratorString} / ${denominatorString}`;
  }
}

// https://wiki.octave.org/Control_package
