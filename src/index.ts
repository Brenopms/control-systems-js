import { Control } from './lib/control/control';

export * from './lib/number';

console.log(
  new Control([
    [-1, -2, 3],
    [1, -2],
  ]).toString()
);
