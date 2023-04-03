import { Complex } from '../math/complex';

const shouldAddNumberToExpression = (num: Complex, expressionLength: number, index: number) => {
  // Should cover last coefficient if the value is 1
  return (index === expressionLength - 1 && num.toString() === '1') || num.toString() !== '1';
};

const shouldAddVariableToExpression = (expressionLength: number, index: number) => expressionLength - index - 1 != 0;
const shouldAddPowToExpression = (expressionLength: number, index: number) => expressionLength - index - 1 != 1;
const shouldAddOperationSignalToExpression = (num: number, index: number) => index !== 0 || (index == 0 && num < 0);

// TODO: improve this code as its hard to understand currently

/**
 * Accepts a polynomial expression and return a string formatted
 * @param expr
 * @param variable string to be used as the variable
 *
 * @example
 * // return -x^2 - 2x + 3
 * expressionToString([-1, -2, 3], 'x')
 */
export const expressionToString = (expr: Complex[], variable = 's'): string => {
  let stringExpression = '';
  expr.forEach((num, index) => {
    if (Math.abs(num.re) > 0 || Math.abs(num.im) > 0) {
      if (shouldAddOperationSignalToExpression(num.re, index)) {
        const isImaginary = Math.abs(num.im) > 0;
        const signal = isImaginary ? ' + ' : num.re > 0 ? ' + ' : ' - ';
        stringExpression += signal;
      }

      if (shouldAddNumberToExpression(num, expr.length, index)) {
        const numToAdd = num?.im !== 0 ? `(${num.toString()})` : `${Math.abs(num.re)}`;
        stringExpression += numToAdd;
      }

      if (shouldAddVariableToExpression(expr.length, index)) {
        stringExpression += `${variable}`;
        if (shouldAddPowToExpression(expr.length, index)) {
          stringExpression += `^${expr.length - index - 1}`;
        }
      }
    }
  });

  return stringExpression;
};
