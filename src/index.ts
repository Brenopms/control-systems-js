import { TransferFunction } from './lib/transferFunction/transferFunction';
import { TransferFunctionInput } from './lib/transferFunction/transferFunction.entities';

/* console.log(
  new TransferFunction([
    [-1, -2],
    [1, -2, 3],
  ]).toString()
);
 */
//console.log(new NewtonRaphson('x^2 - 2x + 3', 2).findRoots('x'));
const tf = new TransferFunction({
  numerator: [
    { re: 1, im: 1 },
    { re: -2, im: 0 },
  ],
  denominator: [
    { re: 1, im: 0 },
    { re: -2, im: 0 },
    { re: -3, im: 0 },
  ],
});

console.log(tf.zero());
console.log(tf.pole());
console.log(tf.toString());
console.log(tf.rlocus2());

export const transferFunction = (transferFunctionInput: TransferFunctionInput) => {
  return new TransferFunction(transferFunctionInput);
};
