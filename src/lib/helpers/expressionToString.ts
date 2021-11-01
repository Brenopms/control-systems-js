/**
 * Accepts a polynomial expression and return a string formatted
 * @param expr
 * @param variable string to be used as the variable
 *
 * @example
 * // return -x^2 - 2x + 3
 * expressionToString([-1, -2, 3], 'x')
 */
export const expressionToString = (expr: number[], variable = 's'): string => {
  let stringExpression = '';

  const shouldAddNumberToExpression = (num: number, expressionLength: number, index: number) =>
    index < expressionLength && Math.abs(num) !== 1;
  const shouldAddVariableToExpression = (expressionLength: number, index: number) => expressionLength - index - 1 != 0;
  const shouldAddPowToExpression = (expressionLength: number, index: number) => expressionLength - index - 1 != 1;
  const shouldAddOperationSignalToExpression = (num: number, index: number) => index !== 0 || (index == 0 && num < 0);

  expr.forEach((num, index) => {
    if (Math.abs(num) > 0) {
      if (shouldAddOperationSignalToExpression(num, index)) {
        const signal = num > 0 ? ' + ' : ' - ';
        stringExpression += signal;
      }

      if (shouldAddNumberToExpression(num, expr.length, index)) {
        stringExpression += `${Math.abs(num)}`;
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
