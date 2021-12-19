import { PolynomialOperations } from './lib/math/polynomialOperations/implementations/PolynomialOperations';
import { DurandKerner } from './lib/math/rootFinding/implementations/durandKerner';
import { RootLocus } from './lib/rootLocus/rootLocus';
import { TransferFunction } from './lib/transferFunction/transferFunction';
import { TransferFunctionInput } from './lib/transferFunction/transferFunction.entities';

/* console.log(
  new TransferFunction([
    [-1, -2],
    [1, -2, 3],
  ]).toString()
);
 */

// TODO: add dependency injection library to manage it
//TODO: change every array generation to use lazy arrays
//console.log(new NewtonRaphson('x^2 - 2x + 3', 2).findRoots('x'));
/* const tf = new TransferFunction({
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
 */

//const po = new PolynomialOperations();

//console.log(po.multiply([6, 10, 0, 5], [4, 2, 1]));

/**
 *
 *
 * Dependency injection for transfer function class
 *
 *
 *
 */

const rootFinder = new DurandKerner();
const polynomialOperations = new PolynomialOperations();

const rootLocus = new RootLocus(polynomialOperations, rootFinder);

/**
 * Exposed library function
 * @param transferFunctionInput
 */
export const transferFunction = (transferFunctionInput: TransferFunctionInput) => {
  return new TransferFunction(transferFunctionInput, 0, rootFinder, rootLocus);
};

// const tf = transferFunction({
//   numerator: [
//     { re: 1, im: 0 },
//     { re: 3, im: 0 },
//   ],
//   denominator: [
//     { re: 1, im: 0 },
//     { re: 3, im: 0 },
//     { re: 5, im: 0 },
//     { re: 1, im: 0 },
//   ],
// });

const tf2 = transferFunction({
  numerator: [1, 3],
  denominator: [1, 3, 5, 1],
});

console.log(tf2.zero());
console.log(tf2.pole());
console.log(tf2.toString());
console.log(JSON.stringify(tf2.rlocus()));
